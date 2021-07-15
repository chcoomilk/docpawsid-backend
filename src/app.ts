import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyOauth2, { OAuth2Namespace } from 'fastify-oauth2';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifyMultipart from 'fastify-multipart';
import fastifyCors from 'fastify-cors';
import fastifyStatic from 'fastify-static';

const app_path = __dirname.split("/");
app_path.pop();
export const root = app_path.join("/");

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  const max_request = process.env.MAX_REQUEST ? +process.env.MAX_REQUEST : undefined;
  const allow_origins = process.env.ALLOW_ORIGINS || "*";
  const max_file_size = process.env.MAX_FILE_SIZE ? +process.env.MAX_FILE_SIZE : undefined;
  const max_files = process.env.MAX_FILES ? +process.env.MAX_FILES : undefined;
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
  fastify.register(fastifyMultipart, {
    limits: {
      fields: 0,
      files: max_files,
      fileSize: max_file_size
    }
  });
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
  
  fastify.register(fastifyStatic, {
    root: root + "/assets"
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
