import { SessionSchema, TokenSchema, UserSchema } from "schemas/auth";
import { z } from "zod";

export type UserDTO = z.infer<typeof UserSchema>;

export type TokenDTO = z.infer<typeof TokenSchema>;

export type SessionDTO = z.infer<typeof SessionSchema>;

export type UserLoginFormDTO = Pick<UserDTO, 'username'|'password'>;

export type UserRegisterFormDTO = Pick<UserDTO, 'username'|'email'|'password'> & { password_confirmation: string };

export type UserVerifyEmailDTO = Pick<UserDTO, '_id'> & Pick<TokenDTO, 'token'>;

export type UserRequestNewCodeDTO = Pick<UserDTO, 'email'>;

export type UserForgotPasswordDTO = Pick<UserDTO, 'email'>;

export type NewPasswordFormDTO = Pick<UserDTO, 'password'> & { password_confirmation: string, userId: string };

export type ValidateCodeChangePasswordDTO = Pick<TokenDTO, 'token'> & { userId: string };

export type GetUserDTO = Pick<UserDTO, '_id'|'username'|'email'|'createAt'>;