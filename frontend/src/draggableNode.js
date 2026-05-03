export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="vs-drag-chip"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
    >
      {icon && <span className="vs-drag-chip-icon">{icon}</span>}
      <span>{label}</span>
    </div>
  );
};
