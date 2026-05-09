import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getTaxonomyTool: Tool = {
  name: 'get_taxonomy',
  description: 'Get taxonomy information',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Taxonomy name' },
    },
  },
};
