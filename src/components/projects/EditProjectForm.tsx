import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";

import { ProjectFormDTO } from "@/types/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProyectById } from "@/services/ProjectService";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormDTO;
  projectId: string;
}

export default function EditProjectForm({ data, projectId } : Readonly<EditProjectFormProps>) {

  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormDTO>({defaultValues: data});

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProyectById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getProjects']});
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]});
      toast.success('Proyecto actualizado');
      navigate('/');
    }
  });

  const handleForm = (formData: ProjectFormDTO) => {
    const data = {
      projectId,
      request: formData,
    };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Editar proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>
      <Link
        className="inline-block bg-purple-400 hover:bg-purple-500 mt-5 px-10 py-3 rounded text-white text-xl font-bold cursor-pointer transition-colors"
        to={'/'}
      >Volver a Proyectos</Link>
      <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate autoComplete="off">
        <ProjectForm register={register} errors={errors} />
        <input 
          type="submit" 
          value="Guardar cambios"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        />
      </form>
    </div>
  )
}
