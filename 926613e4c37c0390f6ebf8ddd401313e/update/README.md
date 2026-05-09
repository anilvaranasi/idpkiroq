# IDP Kiroq MCP Server

Model Context Protocol server for IDP Kiroq - ServiceNow integration tools.

## Features

- Manage capabilities and taxonomies
- Build agent management
- Navigation configuration
- Role and permission management
- Integration connectors (Kubernetes, GitHub, AWS)
- Scorecards and self-service actions
- Approval workflows
- TTL configuration
- Webhook event processing

## Installation

```bash
npm install
npm run build
```

## Configuration

Create a `.env` file:

```env
SERVICENOW_INSTANCE_URL=https://your-instance.service-now.com
SERVICENOW_USERNAME=your_username
SERVICENOW_PASSWORD=your_password
```

## Usage

```bash
npm start
```

## MCP Tools

### Capabilities
- `get_capabilities` - List all available capabilities
- `create_capability` - Create a new capability
- `search_capabilities` - Search capabilities
- `get_capabilities_for_role` - Get capabilities for a role
- `get_capabilities_by_taxonomy` - Get capabilities by taxonomy

### Taxonomy
- `get_taxonomy` - Get taxonomy information

### Build Agents
- `get_build_agents` - List available build agents

### Navigation
- `get_navigation` - Get navigation items

### Roles
- `get_roles` - List all roles

### Integration
- `get_integration_connectors` - List integration connectors
- `sync_external_entity` - Sync an external entity
- `get_external_entities` - List external entities
- `get_webhook_events` - List webhook events
- `process_webhooks` - Process pending webhooks

### Scorecards & Self-Service
- `get_scorecards` - Get scorecard information
- `get_self_service_actions` - List self-service actions

### Approval Workflows
- `get_approval_workflows` - List approval workflows
- `create_approval_request` - Create an approval request

### TTL Configuration
- `get_ttl_config` - Get TTL configuration

### Service Catalog
- `get_service_catalog` - Get service catalog items

### User Personas
- `create_user_persona` - Create a user persona override

## Development

```bash
npm run dev
npm test
```

## License

MIT
