import { User } from "@prisma/client";

export const validate_user_input = (user: User): string | null => {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!res.test(String(user.email).toLowerCase())) {
    return "Invalid Email";
  }

  return null;
};
