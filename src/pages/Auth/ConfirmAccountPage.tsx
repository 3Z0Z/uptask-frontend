import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { confirmAccount } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function ConfirmAccountPage() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const userId = searchParams.get('userId');

  if (userId === null) return (<Navigate to={'/404'} />)

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Cuenta confirmada con éxito');
      navigation('/auth/login');
    }
  })

  const handleComplete = (token: string) => mutate({ token, _id: userId });

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>

      <form className="space-y-8 p-10 bg-white mt-10">
        <label htmlFor="otp" className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput onComplete={handleComplete} otp>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white text-center" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  )
}