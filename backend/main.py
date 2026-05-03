from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import defaultdict, deque
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request models ────────────────────────────────────────────────────

class Node(BaseModel):
    id: str
    model_config = {"extra": "ignore"}

class Edge(BaseModel):
    source: str
    target: str
    model_config = {"extra": "ignore"}

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ── DAG helper ────────────────────────────────────────────────────────

def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Return True if the directed graph formed by nodes/edges is a DAG.

    Uses Kahn's algorithm (BFS topological sort): if every node is
    eventually processed, there are no cycles.
    """
    node_ids = {n.id for n in nodes}

    # Build adjacency list and in-degree map (only for known node ids)
    adj: dict[str, list[str]] = defaultdict(list)
    in_degree: dict[str, int] = {nid: 0 for nid in node_ids}

    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    processed = 0

    while queue:
        current = queue.popleft()
        processed += 1
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed == len(nodes)


# ── Routes ────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag    = check_is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag":    is_dag,
    }
