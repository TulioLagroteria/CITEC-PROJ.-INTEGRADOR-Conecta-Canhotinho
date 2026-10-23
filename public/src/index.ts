import express, { Request, Response, NextFunction } from 'express';

interface Env {
  DB: D1Database;
}

const app = express();
app.use(express.json());

// Rota solicitada: /api/status
app.get('/api/status', async (_req: Request, res: Response) => {
  const env = res.locals.env as Env;

  try {
    // Valida se o banco D1 está respondendo normalmente
    await env.DB.prepare("SELECT 1").run();
    
    res.status(200).json({
      status: "online",
      database: "conectado",
      timestamp: new Date().toISOString(),
      environment: "cloudflare-workers"
    });
  } catch (error: any) {
    res.status(500).json({
      status: "online",
      database: "erro de conexão",
      error: error.message
    });
  }
});

// Fallback para rotas inexistentes (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Passa o contexto 'env' de forma segura para dentro do Express
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.env = env;
      next();
    });

    return await app.handle(request, env, ctx);
  }
};
