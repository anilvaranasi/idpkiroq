import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getTTLConfigTool: Tool = {
  name: 'get_ttl_config',
  description: 'Get TTL configuration',
  inputSchema: {
    type: 'object',
    properties: {
      resource_type: { type: 'string', description: 'Resource type' },
    },
  },
};
