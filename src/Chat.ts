import { Client } from "./Client";
import { Compilations } from "./Compilations";

export class Chat {
    private _compilations: Compilations;
    private _client: Client;

    constructor(client: Client) {
        this._client = client;
    }
    
    get Compilations(): Compilations {
        if (!this._compilations) {
            this._compilations = new Compilations(this._client);
        }
        return this._compilations;
    }
}