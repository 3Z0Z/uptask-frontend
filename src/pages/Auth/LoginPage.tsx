import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginFormDTO } from "@/types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues: UserLoginFormDTO = {
    username: '',
    password: '',
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (token) => {
      localStorage.setItem('token', token.token);
      navigate('/');
    }
  });

  const handleLogin = (formData: UserLoginFormDTO) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white text-center">Iniciar sesión</h1>
      <p className="text-2xl font-light text-white mt-5">
        Comienza a planear tus proyectos  {""}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-col gap-5">
          <label
            htmlFor="email"
            className="font-normal text-2xl"
          >Nombre de usuario</label>

          <input
            id="email"
            type="email"
            placeholder="Nombre de usuario"
            className="w-full p-3  border-gray-300 border"
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
            })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            htmlFor="password"
            className="font-normal text-2xl"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">
          ¿No tienes una cuenta? Crea una
        </Link>
        <Link to={'/auth/forgot-password'} className="text-center text-gray-300 font-normal">
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}