import { Inngest, InngestMiddleware } from "inngest";
import { type Context } from "hono";

const bindings = new InngestMiddleware({
  name: "Cloudflare Workers bindings",
  init() {
    return {
      onFunctionRun({ reqArgs }) {
        return {
          transformInput() {
            const [honoCtx] = reqArgs as [Context | undefined];
            const env = honoCtx?.env as Record<string, string> | undefined;
            return { ctx: { env: env ?? {} } };
          },
        };
      },
    };
  },
});

export const inngest = new Inngest({ id: "better-design", middleware: [bindings] });
