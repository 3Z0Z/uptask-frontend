import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"

import { getTaskById } from "@/services/TaskService";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const _id = queryParams.get('editTask')!;

  const { data, isError } = useQuery({
    queryKey: ['getTaskById', _id],
    queryFn: () => getTaskById({projectId, _id}),
    enabled: !!_id,
    retry: false
  });

  if (isError) return <Navigate to={'/404'} />

  if (data) return <EditTaskModal data={data} />
}
