import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
const useGetTodoData = (useremail) => {
    const axiosecure = useAxiosSecure()
    const { isPending, data: todoData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['todo', useremail],
        queryFn: async () => {
          const res = await axiosecure.get(`/task?useremail=${useremail}`)
          return res.data;
        }
      })
      return [isPending, todoData, refetch]
}

export default useGetTodoData
