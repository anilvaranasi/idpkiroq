import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequest,
  ListToolsRequest,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

interface IDPConfig {
  instanceUrl: string;
  username: string;
  password: string;
}

class IDPKiroqMCP {
  private server: Server;
  private config: IDPConfig;

  constructor() {
    this.config = {
      instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
      username: process.env.SERVICENOW_USERNAME || '',
      password: process.env.SERVICENOW_PASSWORD || '',
    };

    this.server = new Server(
      {
        name: 'idp-kiroq-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupRequestHandlers();
  }

  private setupToolHandlers() {
    const tools: Tool[] = [
      {
        name: 'get_capabilities',
        description: 'List all available capabilities in the IDP',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category' },
            limit: { type: 'number', description: 'Maximum results' },
          },
        },
      },
      {
        name: 'get_taxonomy',
        description: 'Get taxonomy information',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Taxonomy name' },
          },
        },
      },
      {
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
      },
      {
        name: 'get_build_agents',
        description: 'List available build agents',
        inputSchema: {
          type: 'object',
          properties: {
            status: { type: 'string', description: 'Filter by status' },
          },
        },
      },
      {
        name: 'get_navigation',
        description: 'Get navigation items',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category' },
          },
        },
      },
      {
        name: 'get_roles',
        description: 'List all roles',
        inputSchema: {
          type: 'object',
          properties: {
            include_capabilities: { type: 'boolean', description: 'Include capabilities' },
          },
        },
      },
      {
        name: 'get_capabilities_for_role',
        description: 'Get capabilities for a specific role',
        inputSchema: {
          type: 'object',
          properties: {
            role_name: { type: 'string', description: 'Role name' },
          },
        },
      },
      {
        name: 'search_capabilities',
        description: 'Search capabilities by name or description',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
          },
        },
      },
      {
        name: 'get_integration_connectors',
        description: 'List integration connectors',
        inputSchema: {
          type: 'object',
          properties: {
            type: { type: 'string', description: 'Connector type' },
          },
        },
      },
      {
        name: 'sync_external_entity',
        description: 'Sync an external entity',
        inputSchema: {
          type: 'object',
          properties: {
            entity_id: { type: 'string', description: 'Entity ID' },
            connector_type: { type: 'string', description: 'Connector type' },
          },
        },
      },
      {
        name: 'get_scorecards',
        description: 'Get scorecard information',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category' },
          },
        },
      },
      {
        name: 'get_self_service_actions',
        description: 'List self-service actions',
        inputSchema: {
          type: 'object',
          properties: {
            action_type: { type: 'string', description: 'Filter by action type' },
          },
        },
      },
      {
        name: 'get_approval_workflows',
        description: 'List approval workflows',
        inputSchema: {
          type: 'object',
          properties: {
            workflow_type: { type: 'string', description: 'Filter by workflow type' },
          },
        },
      },
      {
        name: 'get_ttl_config',
        description: 'Get TTL configuration',
        inputSchema: {
          type: 'object',
          properties: {
            resource_type: { type: 'string', description: 'Resource type' },
          },
        },
      },
      {
        name: 'create_approval_request',
        description: 'Create an approval request',
        inputSchema: {
          type: 'object',
          properties: {
            workflow_id: { type: 'string', description: 'Workflow ID' },
            requester: { type: 'string', description: 'Requester' },
            details: { type: 'object', description: 'Request details' },
          },
        },
      },
      {
        name: 'get_webhook_events',
        description: 'List webhook events',
        inputSchema: {
          type: 'object',
          properties: {
            processed: { type: 'boolean', description: 'Filter by processed status' },
          },
        },
      },
      {
        name: 'process_webhooks',
        description: 'Process pending webhook events',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_external_entities',
        description: 'List external entities',
        inputSchema: {
          type: 'object',
          properties: {
            connector_type: { type: 'string', description: 'Filter by connector' },
          },
        },
      },
      {
        name: 'get_service_catalog',
        description: 'Get service catalog items',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category' },
          },
        },
      },
      {
        name: 'create_user_persona',
        description: 'Create a user persona override',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'string', description: 'User ID' },
            persona: { type: 'string', description: 'Persona name' },
          },
        },
      },
      {
        name: 'get_capabilities_by_taxonomy',
        description: 'Get capabilities mapped to a taxonomy',
        inputSchema: {
          type: 'object',
          properties: {
            taxonomy_name: { type: 'string', description: 'Taxonomy name' },
          },
        },
      },
    ];

    this.server.setRequestHandler(ListToolsRequest.schema, async () => ({
      tools,
    }));
  }

  private setupRequestHandlers() {
    this.server.setRequestHandler(CallToolRequest.schema, async (request) => {
      switch (request.params.name) {
        case 'get_capabilities':
          return await this.handleGetCapabilities(request.params.arguments);
        case 'get_taxonomy':
          return await this.handleGetTaxonomy(request.params.arguments);
        case 'create_capability':
          return await this.handleCreateCapability(request.params.arguments);
        case 'get_build_agents':
          return await this.handleGetBuildAgents(request.params.arguments);
        case 'get_navigation':
          return await this.handleGetNavigation(request.params.arguments);
        case 'get_roles':
          return await this.handleGetRoles(request.params.arguments);
        case 'get_capabilities_for_role':
          return await this.handleGetCapabilitiesForRole(request.params.arguments);
        case 'search_capabilities':
          return await this.handleSearchCapabilities(request.params.arguments);
        case 'get_integration_connectors':
          return await this.handleGetIntegrationConnectors(request.params.arguments);
        case 'sync_external_entity':
          return await this.handleSyncExternalEntity(request.params.arguments);
        case 'get_scorecards':
          return await this.handleGetScorecards(request.params.arguments);
        case 'get_self_service_actions':
          return await this.handleGetSelfServiceActions(request.params.arguments);
        case 'get_approval_workflows':
          return await this.handleGetApprovalWorkflows(request.params.arguments);
        case 'get_ttl_config':
          return await this.handleGetTTLConfig(request.params.arguments);
        case 'create_approval_request':
          return await this.handleCreateApprovalRequest(request.params.arguments);
        case 'get_webhook_events':
          return await this.handleGetWebhookEvents(request.params.arguments);
        case 'process_webhooks':
          return await this.handleProcessWebhooks(request.params.arguments);
        case 'get_external_entities':
          return await this.handleGetExternalEntities(request.params.arguments);
        case 'get_service_catalog':
          return await this.handleGetServiceCatalog(request.params.arguments);
        case 'create_user_persona':
          return await this.handleCreateUserPersona(request.params.arguments);
        case 'get_capabilities_by_taxonomy':
          return await this.handleGetCapabilitiesByTaxonomy(request.params.arguments);
        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.config.instanceUrl}/api/x_12345/idp/${endpoint}`;
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64')}`,
      },
      data,
    };

    try {
      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error?.message || error.message 
      };
    }
  }

  private async handleGetCapabilities(args: any) {
    return this.makeRequest('capabilities', 'GET', args);
  }

  private async handleGetTaxonomy(args: any) {
    return this.makeRequest(`taxonomy/${args.name}`, 'GET');
  }

  private async handleCreateCapability(args: any) {
    return this.makeRequest('capabilities', 'POST', args);
  }

  private async handleGetBuildAgents(args: any) {
    return this.makeRequest('build_agents', 'GET', args);
  }

  private async handleGetNavigation(args: any) {
    return this.makeRequest('navigation', 'GET', args);
  }

  private async handleGetRoles(args: any) {
    return this.makeRequest('roles', 'GET', args);
  }

  private async handleGetCapabilitiesForRole(args: any) {
    return this.makeRequest(`roles/${args.role_name}/capabilities`, 'GET');
  }

  private async handleSearchCapabilities(args: any) {
    return this.makeRequest('capabilities/search', 'GET', args);
  }

  private async handleGetIntegrationConnectors(args: any) {
    return this.makeRequest('connectors', 'GET', args);
  }

  private async handleSyncExternalEntity(args: any) {
    return this.makeRequest('sync', 'POST', args);
  }

  private async handleGetScorecards(args: any) {
    return this.makeRequest('scorecards', 'GET', args);
  }

  private async handleGetSelfServiceActions(args: any) {
    return this.makeRequest('self_service_actions', 'GET', args);
  }

  private async handleGetApprovalWorkflows(args: any) {
    return this.makeRequest('approval_workflows', 'GET', args);
  }

  private async handleGetTTLConfig(args: any) {
    return this.makeRequest(`ttl_config/${args.resource_type}`, 'GET');
  }

  private async handleCreateApprovalRequest(args: any) {
    return this.makeRequest('approval_requests', 'POST', args);
  }

  private async handleGetWebhookEvents(args: any) {
    return this.makeRequest('webhook_events', 'GET', args);
  }

  private async handleProcessWebhooks(args: any) {
    return this.makeRequest('webhook_events/process', 'POST');
  }

  private async handleGetExternalEntities(args: any) {
    return this.makeRequest('external_entities', 'GET', args);
  }

  private async handleGetServiceCatalog(args: any) {
    return this.makeRequest('service_catalog', 'GET', args);
  }

  private async handleCreateUserPersona(args: any) {
    return this.makeRequest('user_personas', 'POST', args);
  }

  private async handleGetCapabilitiesByTaxonomy(args: any) {
    return this.makeRequest(`taxonomy/${args.taxonomy_name}/capabilities`, 'GET');
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('IDP Kiroq MCP Server running on stdio');
  }
}

const server = new IDPKiroqMCP();
server.run().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
