import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getNavigationTool: Tool = {
  name: 'get_navigation',
  description: 'Get navigation items',
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: 'Filter by category' },
    },
  },
};
