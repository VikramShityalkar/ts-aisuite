import { Chat } from "./Chat";
import { ProviderConfig } from "./core/ProviderConfig";

export class Client {

    public providerConfig: ProviderConfig;
    private _chat: Chat;

    constructor(providerConfig: ProviderConfig) {
        this.providerConfig = providerConfig;
    }

    get Chat(): Chat {
        if (!this._chat)
            this._chat = new Chat(this);
        return this._chat;
    }


}