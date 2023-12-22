import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { YourTaskData } from '../../Context/YourTaskContext'


const UpdateTask = () => {
    document.title = 'YourTask | update task'
    const {currentUser}=useContext(YourTaskData)
    const { id } = useParams()
    const [singletask, setsingletask] = useState(null)
    const [loading, setloading] = useState(false)
    const axiosecure = useAxiosSecure()
    useEffect(() => {
        axiosecure.get(`/sinngletask?id=${id}`)
            .then((res) => {
                setsingletask(res.data);
            })
    }, [])
    // console.log(singletask);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async (data) => {
        if (data.title === '') {
            data.title = singletask.title;
        }
        if (data.description === '') {
            data.description = singletask.description;
        }
        if (data.priority === '') {
            data.priority = singletask.priority;
        }
        if (data.deadline === '') {
            data.deadline = singletask.deadline;
        }

        if (data.title.length > 75) {
            console.log(data.title.length);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "title should not be larger then 75 charecter",
            });
        }
        if (data.description.length > 250) {
            console.log(data.title.length);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "deadline should not be larger then 250 charecter",
            });
        }
        setloading(true)
        const res = await axiosecure.patch(`/task?useremail=${currentUser?.useremail}&id=${id}`, data)
        if (res.data.acknowledged) {
            setloading(false)
            navigate('/dashboard/mytask')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "new task aded succesfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
        setloading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-white p-3 flex flex-col items-start gap-2 justify-start mt-12' >
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" defaultValue={singletask?.title} {...register("title")} />
                <textarea className="block outline-none border-b-2 w-full resize-none mx-auto p-2 pl-0 border-b-gray-400" type="text" defaultValue={singletask?.description} {...register("description")} />
                <select  className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" {...register("priority")}>
                    <option selected={singletask?.priority === ''} value={''} >priority</option>
                    <option selected={singletask?.priority === '3'} value="3">high</option>
                    <option selected={singletask?.priority === '2'} value="2">moderate</option>
                    <option selected={singletask?.priority === '1'} value="1">Low</option>
                </select>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="date" defaultValue={singletask?.deadline} {...register("deadline")} />
                <button className="w-full bg-blue-600 cursor-pointer rounded-lg mt-2 text-yellow-400 py-2 hover:bg-blue-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'update'}</button>
            </form>
        </div>
    )
}

export default UpdateTask
