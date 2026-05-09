import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getCapabilitiesTool: Tool = {
  name: 'get_capabilities',
  description: 'List all available capabilities in the IDP',
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: 'Filter by category' },
      limit: { type: 'number', description: 'Maximum results' },
    },
  },
};

export const createCapabilityTool: Tool = {
  name: 'create_capability',
  description: 'Create a new capability',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Capability name' },
      category: { type: 'string', description: 'Category' },
      description: { type: 'string', description: 'Description' },
    },
  },
};

export const searchCapabilitiesTool: Tool = {
  name: 'search_capabilities',
  description: 'Search capabilities by name or description',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Search query' },
    },
  },
};

export const getCapabilitiesForRoleTool: Tool = {
  name: 'get_capabilities_for_role',
  description: 'Get capabilities for a specific role',
  inputSchema: {
    type: 'object',
    properties: {
      role_name: { type: 'string', description: 'Role name' },
    },
  },
};

export const getCapabilitiesByTaxonomyTool: Tool = {
  name: 'get_capabilities_by_taxonomy',
  description: 'Get capabilities mapped to a taxonomy',
  inputSchema: {
    type: 'object',
    properties: {
      taxonomy_name: { type: 'string', description: 'Taxonomy name' },
    },
  },
};
