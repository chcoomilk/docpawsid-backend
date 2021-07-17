import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';
import fastifyJWT from 'fastify-jwt';
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
  const allow_origins = process.env.ALLOW_ORIGINS || "*";
  const jwt_secret = process.env.JWT_SECRET;
  const max_request = process.env.MAX_REQUEST ? +process.env.MAX_REQUEST : undefined;
  const max_file_size = process.env.MAX_FILE_SIZE ? +process.env.MAX_FILE_SIZE : undefined;
  const max_files = process.env.MAX_FILES ? +process.env.MAX_FILES : undefined;
  const max_token_lifetime = process.env.MAX_TOKEN_LIFETIME;
  if (!jwt_secret) throw new Error("Please provide a secret in .env file");
  if (!max_token_lifetime) throw new Error("Please provide a 'MAX_TOKEN_LIFETIME' in .env file")
  if (allow_origins == "*") fastify.log.warn("Allowing all origins");
  
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
    secret: jwt_secret,
    sign: {
      expiresIn: max_token_lifetime
    }
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

export default app;
export { app }
