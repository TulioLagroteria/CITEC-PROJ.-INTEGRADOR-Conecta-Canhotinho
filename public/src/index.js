export default {
  async fetch(request, env, _ctx) {
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
    } catch (error) {
      return Response.json({
        status: 'online',
        database: 'erro de conexão',
        error: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
  }
};
