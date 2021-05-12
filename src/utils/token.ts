import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const configPath = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']!, '.rcreate-config.json');

interface Config {
  token: string
}

export function getToken(): string | null {

  const configExits = existsSync(configPath);
  if(!configExits) {
    return null;
  }

  const config: Config = JSON.parse(readFileSync(configPath, { encoding: 'utf-8' }).toString());

  return config.token;
}

export function saveToken(token: string): void {
  const config: Config = {
    token
  };

  writeFileSync(configPath, JSON.stringify(config), 'utf-8');
}