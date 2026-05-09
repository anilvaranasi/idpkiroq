import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getServiceCatalogTool: Tool = {
  name: 'get_service_catalog',
  description: 'Get service catalog items',
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: 'Filter by category' },
    },
  },
};
