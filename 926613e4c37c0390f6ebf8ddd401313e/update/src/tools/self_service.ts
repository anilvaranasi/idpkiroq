import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getSelfServiceActionsTool: Tool = {
  name: 'get_self_service_actions',
  description: 'List self-service actions',
  inputSchema: {
    type: 'object',
    properties: {
      action_type: { type: 'string', description: 'Filter by action type' },
    },
  },
};
