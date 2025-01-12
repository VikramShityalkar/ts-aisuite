export interface ProviderConfig {
    [key: string]: {
      [key: string]: string | undefined; // You can use 'string' or 'any' if the properties are dynamic
    };
  }
  