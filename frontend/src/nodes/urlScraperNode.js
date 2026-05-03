import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6.5 9.5a4.24 4.24 0 0 0 6 0l1.5-1.5a4.24 4.24 0 0 0-6-6L7 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M9.5 6.5a4.24 4.24 0 0 0-6 0L2 8a4.24 4.24 0 0 0 6 6L9 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const handles = [
  { suffix: 'input',  type: 'target', position: Position.Left },
  { suffix: 'output', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'scraperName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('urlScraper-', 'url_loader_'),
  },
  {
    key: 'provider',
    label: 'Provider',
    type: 'select',
    defaultValue: 'Default',
    options: [
      { value: 'Default',    label: 'Default'    },
      { value: 'Playwright', label: 'Playwright' },
      { value: 'Puppeteer',  label: 'Puppeteer'  },
    ],
  },
  {
    key: 'url',
    label: 'URL',
    type: 'text',
    required: true,
    placeholder: 'www.example.com',
    badges: ['Text'],
  },
  {
    key: 'useBrowserActions',
    label: 'Use browser actions',
    type: 'toggle',
    defaultValue: false,
  },
  {
    key: 'recursive',
    label: 'Recursive',
    type: 'toggle',
    defaultValue: false,
  },
];

export const URLScraperNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="URL Scraper: Scrape URL"
    icon={icon}
    description="Scrape the contents from a URL"
    handles={handles}
    fields={fields}
    width={280}
  />
);
