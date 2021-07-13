import { User } from "@prisma/client";
import { FastifyRequest } from "fastify";

// export interface User {
//   id: 0,
//   email: string,
//   name: string | null,
//   phone_number: string | null,
//   profile_picture_url: string | null,
//   province_id: number | null,
//   city_id: number | null
// }

export type UserRequest = FastifyRequest<{
  Params: {
    user_id: string
  },
  Body: User
}>