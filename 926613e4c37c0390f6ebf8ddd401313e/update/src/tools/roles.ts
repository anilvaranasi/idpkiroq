import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getRolesTool: Tool = {
  name: 'get_roles',
  description: 'List all roles',
  inputSchema: {
    type: 'object',
    properties: {
      include_capabilities: { type: 'boolean', description: 'Include capabilities' },
    },
  },
};
