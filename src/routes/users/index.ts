import { FastifyPluginAsync } from "fastify";
// import { database } from "../../utilities/database";
import UserController from "./controller";
import { UserRequest } from "./types";
// import { UserBody, UserRequest } from "./types";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/:user_id", UserController.Get);
  fastify.get("/", UserController.GetAll)
  fastify.put("/:user_id", {
    // onRequest: [fastify.authenticate],
    // preValidation: async (req, rep) => {
    //   const id_params = +req.params.user_id;
    //   if (!id_params) return rep.badRequest();
    //   try {
    //     const user = await database.user.findUnique({ where: { id: +req.params.user_id }});        
    //     if (!user) return rep.notFound(); 
    //     if (+req.params.user_id != req.user.id) return rep.forbidden();
    //   } catch (error) {
    //     return rep.internalServerError(error)
    //   }
    // },
    // schema: {
    //   body: UserBody
    // }
  }, UserController.Update);
  fastify.post("/register", {
  }, UserController.Add);
  fastify.post("/login", UserController.Login);
  fastify.get("/login/google", (req: UserRequest, rep) => { return UserController.GoogleLogin(fastify, req, rep) });
  fastify.delete("/:user_id", UserController.Delete)
};

export default users;
