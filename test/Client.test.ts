import { Client } from "../src/Client";
import { ProviderConfig } from "../src/core/ProviderConfig";
import { Chat } from "../src/Chat";
import { Compilations } from "../src/Compilations";
import { Choice } from "../src/core/Choice";

describe('Client', () => {
    let providerConfig: ProviderConfig;
    let client: Client;

    beforeEach(() => {
        providerConfig = {
            "ollama": {
                "OLLAMA_API_URL": "http://localhost:11434"
            }
        }
        client = new Client(providerConfig);
    });

    it('should initialize with the provided ProviderConfig', () => {
        expect(client.providerConfig).toBe(providerConfig);
    });

    it('should lazily initialize Chat instance', () => {
        expect(client.Chat).toBeInstanceOf(Chat);
        expect(client.Chat).toBe(client.Chat); // should return the same instance
    });

    it('should lazily initialize Compilation instance', () => {
        expect(client.Chat.Compilations).toBeInstanceOf(Compilations);
        expect(client.Chat.Compilations).toBe(client.Chat.Compilations); // should return the same instance
    });

    it('should return response ChatCompilationResponse instance', async () => {
        const chatCompilationResponse = await client.Chat.Compilations.create("ollama:llama3.2:3b", [{
            content: "Hello",
            role: "user"
        }]);
        expect(chatCompilationResponse.choices[0]).toBeInstanceOf(Choice)
        expect(client.Chat.Compilations).toBe(client.Chat.Compilations); // should return the same instance
    });
});