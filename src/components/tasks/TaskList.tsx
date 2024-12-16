import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

import { getTasksByProjectId } from "@/services/TaskService";
import { initialStatusGroups, statusStyles, statusTranslations } from "../../helper/index";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data } = useQuery({
    queryKey: ['getTasksByProjectId', projectId],
    queryFn: () => getTasksByProjectId(projectId),
    retry: false
  });

  const groupedTasks = data?.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-12'>
        {groupedTasks && Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <h3 
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
            >{statusTranslations[status]}</h3>
            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
