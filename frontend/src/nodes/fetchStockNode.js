import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 6h12" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5 9.5l2-2 2 2 2-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const handles = [
  { suffix: 'input',  type: 'target', position: Position.Left },
  { suffix: 'output', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'stockName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('fetchStock-', 'fetch_stock_prices_'),
  },
  {
    key: 'tickers',
    label: 'Tickers',
    type: 'text',
    required: true,
    placeholder: 'e.g. AAPL, TSLA, GOOGL',
    badges: ['Text'],
  },
  {
    key: 'startDate',
    label: 'Start Date',
    type: 'text',
    defaultValue: '',
    placeholder: 'YYYY-MM-DD',
    badges: ['Text'],
  },
  {
    key: 'endDate',
    label: 'End Date',
    type: 'text',
    defaultValue: '',
    placeholder: 'YYYY-MM-DD',
    badges: ['Text'],
  },
];

export const FetchStockNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="Fetch Stock Prices"
    icon={icon}
    description="Fetch historical stock prices for one or more companies"
    handles={handles}
    fields={fields}
    width={280}
  />
);
