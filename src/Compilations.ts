import { Client } from "./Client";
import { ChatCompilationResponse } from "./core/ChatCompilationResponse";
import { Message } from "./core/Message";
import { OllamaProvider } from "./providers/OllamaProvider";

export class Compilations {
    private client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    async create(model: string, messages: Message[]): Promise<ChatCompilationResponse> {
        const modelStrParts = model.split(':');
        if (modelStrParts.length < 2) {
            throw Error(`Invalid model format. Expected 'provider:model', got '${model}'"`);
        }
        const modelKey = modelStrParts[0];
        const config = this.client.providerConfig[modelKey];
        const ollamaProvider: OllamaProvider = new OllamaProvider(config);
        const llmName: string = model.replace(`${modelKey}:`, '');
        return await ollamaProvider.chatCompilationCreate(llmName, messages);
    }
}