import { Hono } from "hono";
import { cors } from "hono/cors";
import designSystemsRoute from "./design-systems";
import principlesRoute from "./principles";
import iconLibrariesRoute from "./icon-libraries";
import reviewRulesRoute from "./review-rules";

export const v1Router = new Hono()
  .use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .route("/design-systems", designSystemsRoute)
  .route("/principles", principlesRoute)
  .route("/icon-libraries", iconLibrariesRoute)
  .route("/review-rules", reviewRulesRoute);
