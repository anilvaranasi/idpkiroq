import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getIntegrationConnectorsTool: Tool = {
  name: 'get_integration_connectors',
  description: 'List integration connectors',
  inputSchema: {
    type: 'object',
    properties: {
      type: { type: 'string', description: 'Connector type' },
    },
  },
};

export const syncExternalEntityTool: Tool = {
  name: 'sync_external_entity',
  description: 'Sync an external entity',
  inputSchema: {
    type: 'object',
    properties: {
      entity_id: { type: 'string', description: 'Entity ID' },
      connector_type: { type: 'string', description: 'Connector type' },
    },
  },
};

export const getExternalEntitiesTool: Tool = {
  name: 'get_external_entities',
  description: 'List external entities',
  inputSchema: {
    type: 'object',
    properties: {
      connector_type: { type: 'string', description: 'Filter by connector' },
    },
  },
};

export const getWebhookEventsTool: Tool = {
  name: 'get_webhook_events',
  description: 'List webhook events',
  inputSchema: {
    type: 'object',
    properties: {
      processed: { type: 'boolean', description: 'Filter by processed status' },
    },
  },
};

export const processWebhooksTool: Tool = {
  name: 'process_webhooks',
  description: 'Process pending webhook events',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};
