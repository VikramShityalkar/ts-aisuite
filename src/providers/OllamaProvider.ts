import { ChatCompilationResponse } from "../core/ChatCompilationResponse";
import { Choice } from "../core/Choice";
import { Message } from "../core/Message";
import { Provider } from "../core/Provider";
import axios, { AxiosResponse } from "axios";

export class OllamaProvider implements Provider {

    private CHAT_COMPILATION_ENDPOINT: string = "/api/chat";
    private DEFAULT_OLLAMA_API_URL: string = "http://localhost:11434";

    private OLLAMA_API_URL = "";
    constructor(config) {
        this.OLLAMA_API_URL = config?.["OLLAMA_API_URL"] || this.DEFAULT_OLLAMA_API_URL;
        this.OLLAMA_API_URL = this.OLLAMA_API_URL.replace(/\/$/, "") + this.CHAT_COMPILATION_ENDPOINT;
    }
    async chatCompilationCreate(model: string, messages: Array<Message>): Promise<ChatCompilationResponse> {
        const stream = false;
        const config = {
            method: "POST",
            url: this.OLLAMA_API_URL,
            data: {
                model,
                messages,
                stream
            }
        }
        const response = await axios(config);
        return this.normalizeResponse(response);
    }

    private normalizeResponse(responseData: AxiosResponse): ChatCompilationResponse {
        const choice: Choice = new Choice();
        choice.message = {
            content: responseData.data.message.content,
            role: responseData.data.message.role
        }
        const chatCompilationResponse: ChatCompilationResponse = {
            choices: [choice]
        }
        return chatCompilationResponse;
    }
}