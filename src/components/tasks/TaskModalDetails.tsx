import { ChangeEvent, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getTaskById, updateTastStatusById } from "@/services/TaskService";
import { formatDate, statusTranslations } from "../../helper/index";
import { TaskStatusEnum, UpdateTaskStatusByIdDTO } from "@/types/tasks";

export default function TaskModalDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const projectId = params.projectId!;
  const taskId = queryParams.get('viewTask')!;
  const show = !!taskId;

  const { data, isError, error } = useQuery({
    queryKey: ['getTaskById', taskId],
    queryFn: () => getTaskById({ projectId, _id: taskId }),
    enabled: !!taskId,
    retry: false
  });

  const { mutate } = useMutation({
    mutationFn: updateTastStatusById,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasksByProjectId', projectId] });
      queryClient.invalidateQueries({ queryKey: ['getTaskById', taskId] });
      toast.success('Tarea actualizada');
    }
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const request: UpdateTaskStatusByIdDTO = {
      _id: taskId,
      projectId,
      status: event.target.value as TaskStatusEnum
    };
    mutate(request);
  };

  if (isError) {
    toast.error(error.message, {toastId: 'error'});
    return <Navigate to={`/projects/${projectId}`} />
  }

  if (data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <p className="text-sm text-slate-400">Agregada el: {formatDate(data.createAt)}</p>
                  <DialogTitle
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5"
                  >
                    {data.name}
                  </DialogTitle>
                  <p className="text-lg text-slate-500 mb-2">Descripción: {data.description}</p>
                  <div className="my-5 space-y-3">
                    <label htmlFor="status" className="font-bold">Estado Actual: {statusTranslations[data.status]}</label>
                    <select 
                      name="status" 
                      id="status"
                      className="w-full p-3 bg-white border border-gray-300"
                      defaultValue={data.status}
                      onChange={handleChange}
                    >
                      {Object.entries(statusTranslations).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
