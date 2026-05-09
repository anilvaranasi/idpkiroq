import { Tool } from '@modelcontextprotocol/sdk/types.js';

export interface ToolHandler {
  (args: any): Promise<any>;
}

export interface ToolDefinition {
  tool: Tool;
  handler: ToolHandler;
}
