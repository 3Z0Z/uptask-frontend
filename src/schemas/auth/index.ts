import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  isEmailConfirmed: z.boolean(),
  createAt: z.string(),
});

export const TokenSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  token: z.string(),
  createdAt: z.string(),
});

export const SessionSchema = z.object({
  token: z.string(),
});
