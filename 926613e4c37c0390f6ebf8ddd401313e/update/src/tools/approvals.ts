import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getApprovalWorkflowsTool: Tool = {
  name: 'get_approval_workflows',
  description: 'List approval workflows',
  inputSchema: {
    type: 'object',
    properties: {
      workflow_type: { type: 'string', description: 'Filter by workflow type' },
    },
  },
};

export const createApprovalRequestTool: Tool = {
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
};
