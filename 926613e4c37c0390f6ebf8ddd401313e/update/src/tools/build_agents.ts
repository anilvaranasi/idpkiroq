import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getBuildAgentsTool: Tool = {
  name: 'get_build_agents',
  description: 'List available build agents',
  inputSchema: {
    type: 'object',
    properties: {
      status: { type: 'string', description: 'Filter by status' },
    },
  },
};
