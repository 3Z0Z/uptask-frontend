import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { validateCodeChangePassword } from "@/services/AuthService";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  userId: string;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({ userId, setIsValidToken }: Readonly<NewPasswordTokenProps>) {
  const { mutate } = useMutation({
    mutationFn: validateCodeChangePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsValidToken(true);
      toast.success('Código validado correctamente');
    }
  });
  const handleComplete = (token: string) => mutate({userId, token});

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label htmlFor="pin" className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={""}
            onComplete={handleComplete}
          >
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}