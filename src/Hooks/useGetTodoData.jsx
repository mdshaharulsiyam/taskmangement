import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
const useGetTodoData = (useremail,status) => {
    const axiosecure = useAxiosSecure()
    const { isPending, data: todoData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['task', useremail,status],
        queryFn: async () => {
          const res = await axiosecure.get(`/task?useremail=${useremail}&status=${status}`)
          return res.data;
        }
      })
      return [isPending, todoData, refetch]
}

export default useGetTodoData
