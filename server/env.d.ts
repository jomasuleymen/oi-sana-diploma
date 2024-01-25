declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      ORIGINS: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_PORT: string;
      POSTGRES_HOST: string;
      POSTGRES_DB: string;
      SESSION_SECRET: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
    }
  }
}

export {};
