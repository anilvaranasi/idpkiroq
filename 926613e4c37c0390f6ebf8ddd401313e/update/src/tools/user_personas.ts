import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const createUserPersonaTool: Tool = {
  name: 'create_user_persona',
  description: 'Create a user persona override',
  inputSchema: {
    type: 'object',
    properties: {
      user_id: { type: 'string', description: 'User ID' },
      persona: { type: 'string', description: 'Persona name' },
    },
  },
};
