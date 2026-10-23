interface D1Database {
  prepare(query: string): {
    run(): Promise<unknown>;
  };
}

interface Env {
  DB: D1Database;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/status") {
      try {
        await env.DB.prepare("SELECT 1").run();

        return json({
          status: "online",
          database: "conectado",
          timestamp: new Date().toISOString(),
          environment: "cloudflare-workers"
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        return json({
          status: "online",
          database: "erro de conexão",
          error: message
        }, 500);
      }
    }

    return json({ error: "Rota não encontrada" }, 404);
  }
};
