import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyOauth2, { OAuth2Namespace } from 'fastify-oauth2';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifyMultipart from 'fastify-multipart';
import fastifyCors from 'fastify-cors';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  const max_request = process.env.MAX_REQUEST ? +process.env.MAX_REQUEST : 100;
  const allow_origins = process.env.ALLOW_ORIGINS || "*";
  const google = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET
  };
  if (!google.client_id || !google.secret) fastify.log.error("Missing Google OAuth2 Credentials");
  if (allow_origins == "*") fastify.log.warn("Allowing all origins");
  const OAUTH2: any = fastifyOauth2;
  
  fastify.register(fastifyCors, {
    origin: allow_origins
  });
  fastify.register(fastifyRateLimit, {
    max: max_request,
    timeWindow: "1 minute",
  });
  fastify.register(fastifyMultipart);
  fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET || "",
  });
  fastify.register(OAUTH2, {
    name: "googleOAuth2",
    credentials: {
      client: {
        id: google.client_id,
        secret: google.secret
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION
    },
    startRedirectPath: "/users/login/google",
    callbackUri: "http://localhost:3000/users/login/google/callback",
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })
};

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: {
      id: number
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export default app;
export { app }
