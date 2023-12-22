import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"

const useGetPrevTask = (useremail) => {
    const axiosecure = useAxiosSecure()
    const { isPending, data: taskData = [], refetch } = useQuery({
        enabled: !!useremail,
          queryKey : ['tasks', useremail],
        queryFn: async () => {
          const res = await axiosecure.get(`/alltask?useremail=${useremail}`)
          return res.data;
        }
      })
      return [isPending, taskData, refetch]
}

export default useGetPrevTask
