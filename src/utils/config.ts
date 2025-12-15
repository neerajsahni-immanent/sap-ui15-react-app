export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const DEBUG: boolean = Boolean(import.meta.env.VITE_DEBUG) || import.meta.env.MODE !== 'production';

export const logger = {
  info: (...args: unknown[]) => {
    if (DEBUG) console.info('[info]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (DEBUG) console.warn('[warn]', ...args);
  },
  error: (...args: unknown[]) => {
    if (DEBUG) console.error('[error]', ...args);
  },
};
