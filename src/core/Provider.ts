import { ChatCompilationResponse } from "./ChatCompilationResponse";
import { Message } from "./Message";

export interface Provider {
    chatCompilationCreate(model: string, messages: Array<Message>): Promise<ChatCompilationResponse>
}