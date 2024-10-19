import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { promisify } from 'util';

@Injectable()
export class AppService {
  private client;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string, value: string) => Promise<unknown>;

  constructor() {
    this.client = createClient();
    this.client.connect().catch(console.error); 

    this.getAsync = (key: string) => this.client.get(key);
    this.setAsync = (key: string, value: string) => this.client.set(key, value);
  }

  async setValue(key: string, value: string): Promise<void> {
    await this.setAsync(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.getAsync(key);
  }
}
