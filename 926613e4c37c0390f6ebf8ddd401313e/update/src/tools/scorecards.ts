import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getScorecardsTool: Tool = {
  name: 'get_scorecards',
  description: 'Get scorecard information',
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: 'Filter by category' },
    },
  },
};
