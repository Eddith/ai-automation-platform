import {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
  INodeInputConfiguration,
  INodeOutputConfiguration,
  NodeConnectionType,
} from "n8n-workflow";
import { OptionsWithUri } from "request";

export class AiPromptNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: "AI Prompt Node",
    name: "aiPromptNode",
    group: ["transform"],
    version: 1,
    description: "Sends prompt to LLM service",
    defaults: { name: "AI Prompt" },
    inputs: ["main"] as (NodeConnectionType | INodeInputConfiguration)[],
    outputs: ["main"] as (NodeConnectionType | INodeOutputConfiguration)[],
    properties: [
      {
        displayName: "Prompt",
        name: "prompt",
        type: "string",
        default: "",
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const prompt = this.getNodeParameter("prompt", 0) as string;
    const options: OptionsWithUri = {
      method: "POST",
      uri: "http://llm-proxy:8080/ask",
      body: { prompt },
      json: true,
    };
    const responseData = await this.helpers.request(options);
    return [this.helpers.returnJsonArray([responseData])];
  }
}
