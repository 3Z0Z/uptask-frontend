import { useState } from "react";

import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";

export default function NewPasswordPage() {
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId')!;
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Reestablecer contraseña</h1>
      {!isValidToken ?
        <p className="text-2xl font-light text-white mt-5">
          Ingresa el código que recibiste {""}
          <span className=" text-fuchsia-500 font-bold"> por email</span>
        </p>
      :
        <p className="text-2xl font-light text-white text-center mt-5">
          Ingresa tu nueva {""}
          <span className=" text-fuchsia-500 font-bold"> contraseña</span>
        </p>
      }
      {!isValidToken ? 
        <NewPasswordToken userId={userId} setIsValidToken={setIsValidToken} />
      :
        <NewPasswordForm userId={userId} />
      }
    </>
  )
}
