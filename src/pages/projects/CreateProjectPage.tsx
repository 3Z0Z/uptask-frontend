import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "@/services/ProjectService";
import type { ProjectFormDTO } from "types/projects";

export default function CreateProjectPage() {

  const navigate = useNavigate();
  const initialValues: ProjectFormDTO = {
    projectName: '',
    clientName: '',
    description: ''
  };
  const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormDTO>({defaultValues: initialValues});
  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Proyecto creado correctamente');
      navigate('/');
    }
  });
  const handleForm = (data: ProjectFormDTO) => mutate(data);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>
      <Link
        className="inline-block bg-purple-400 hover:bg-purple-500 mt-5 px-10 py-3 rounded text-white text-xl font-bold cursor-pointer transition-colors"
        to={'/'}
      >Volver a Proyectos</Link>
      <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <ProjectForm register={register} errors={errors} />
        <input 
          type="submit" 
          value="Crear Proyecto"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </div>
  )
}
