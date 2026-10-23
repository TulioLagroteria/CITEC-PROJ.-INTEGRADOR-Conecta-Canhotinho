interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/status') {
      return Response.json({ error: 'Rota não encontrada' }, { status: 404 });
    }

    try {
      await env.DB.prepare('SELECT 1').run();

      return Response.json({
        status: 'online',
        database: 'conectado',
        timestamp: new Date().toISOString(),
        environment: 'cloudflare-workers'
      });
    } catch (error: unknown) {
      return Response.json({
        status: 'online',
        database: 'erro de conexão',
        error: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
  }
};
