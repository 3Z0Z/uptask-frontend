import { AxiosResponse, isAxiosError } from "axios";

import { GetUserDTO, NewPasswordFormDTO, SessionDTO, UserForgotPasswordDTO, UserLoginFormDTO, UserRegisterFormDTO, UserRequestNewCodeDTO, UserVerifyEmailDTO, ValidateCodeChangePasswordDTO } from "@/types/auth";
import api_auth from "../lib/auth-axios";


export async function registerUser(request: UserRegisterFormDTO) {
  try {
    await api_auth.post("/auth/register", request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function confirmAccount(request: UserVerifyEmailDTO) {
  try {
    await api_auth.post(`/auth/validateEmail`, { token: request.token, userId: request._id });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function requestNewCode(request: UserRequestNewCodeDTO) {
  try {
    await api_auth.post(`/auth/request-code`, request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function login(request: UserLoginFormDTO): Promise<SessionDTO> {
  try {
    const { data }: AxiosResponse<SessionDTO> = await api_auth.post(`/auth/login`, request);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function forgotPassword(request: UserForgotPasswordDTO) {
  try {
    await api_auth.post(`/auth/forgot-password`, request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function validateCodeChangePassword(request: ValidateCodeChangePasswordDTO) {
  try {
    await api_auth.post(`/auth/validate-code-change-password`, { token: request.token, userId: request.userId });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function changePassword(request: NewPasswordFormDTO) {
  try {
    await api_auth.put(`/auth/change-password`, { userId: request.userId, password: request.password });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function refreshToken() {
  try {
    const { data }: AxiosResponse<SessionDTO> = await api_auth.put(`/auth/refresh-token`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function getUser() {
  try {
    const { data }: AxiosResponse<GetUserDTO> = await api_auth.get(`/auth/get-user`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}

export async function logout() {
  try {
    await api_auth.post(`/auth/logout`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrió un error desconocido");
  }
}
