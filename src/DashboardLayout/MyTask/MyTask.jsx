import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { YourTaskData } from '../../Context/YourTaskContext';
import Swal from 'sweetalert2';
import useGetTodoData from '../../Hooks/useGetTodoData';
import { FaMinus } from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom';
const MyTask = () => {
    document.title = 'YourTask | my task'
    const { currentUser } = useContext(YourTaskData)
    const [isPending, todoData, refetch] = useGetTodoData(currentUser?.useremail, 'todo')
    const [loadingdata, ongoingData, refetchdata] = useGetTodoData(currentUser?.useremail, 'ongoing')
    const [pending, completedData, fetchagain] = useGetTodoData(currentUser?.useremail, 'completed')
    // console.log(ongoingData);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [loading, setloading] = useState(false)
    const [openacordian, setopenacordian] = useState(false)
    const [showid, setShowid] = useState(null)
    const axiosecure = useAxiosSecure()
    const [showtaskform, setshowtaskform] = useState(false)
    const onSubmit = async (data) => {
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
        data.status = 'todo'
        data.useremail = currentUser?.useremail
        const res = await axiosecure.post('/task', data)
        if (res.data.acknowledged) {
            reset()
            refetchdata()
            refetch()
            fetchagain()
            setshowtaskform(false)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "new task aded succesfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const taskStart = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want's to start this task",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    status: 'ongoing',
                }
                axiosecure.patch(`/task?useremail=${currentUser?.useremail}&id=${id}`, data)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "started!",
                                text: "tast started succesfully",
                                icon: "success"
                            });
                            refetchdata()
                            refetch()
                            fetchagain()
                        }
                    })

            }
        });
    }
    const taskcomplete = (id) => {
        Swal.fire({
            title: "Are you sure? your task completed",
            text: "according to our data you haven't started your task yet",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    status: 'completed',
                }
                axiosecure.patch(`/task?useremail=${currentUser?.useremail}&id=${id}`, data)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "started!",
                                text: "tast started succesfully",
                                icon: "success"
                            });
                            refetchdata()
                            refetch()
                            fetchagain()
                        }
                    })

            }
        });
    }
    const taskdelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosecure.delete(`/task?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetchdata()
                            refetch()
                            fetchagain()
                        }
                    })

            }
        });
    }
    return (
        <div className='px-3 container mx-auto'>
            {showtaskform && <>
                <div onClick={() => setshowtaskform(false)} className='bg-black bg-opacity-10 absolute min-h-screen block w-full top-0 left-0'></div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-72 md:w-[50%] bg-white p-3 flex flex-col items-start gap-2 justify-start z-40 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' >
                    <IoCloseSharp onClick={() => setshowtaskform(false)} className='text-4xl ml-auto cursor-pointer hover:bg-red-600 transition-all' />
                    <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task title" {...register("title", { required: true })} />
                    {errors.title && <p className="text-red-500 ">title is required*</p>}
                    <textarea className="block outline-none border-b-2 w-full resize-none mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task description" {...register("description", { required: true })} />
                    {errors.title && <p className="text-red-500 ">description is required*</p>}
                    <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" {...register("priority", { required: true })}>
                        <option selected disabled value={''} >priority</option>
                        <option value="3">high</option>
                        <option value="2">moderate</option>
                        <option value="1">Low</option>
                    </select>
                    {errors.priority && <p className="text-red-500 ">priority is required*</p>}
                    <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="date" placeholder="deadline" {...register("deadline", { required: true })} />
                    {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}
                    <button className="w-full bg-blue-600 cursor-pointer rounded-lg mt-2 text-yellow-400 py-2 hover:bg-blue-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'create'}</button>
                </form>
            </>}
            <button onClick={() => setshowtaskform(true)} className='flex justify-start items-center gap-1 mt-10 mb-2 bg-blue-600 text-yellow-400 hover:bg-blue-800'> <FaPlus />  Add New Task</button>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 items-start justify-start '>
                <div className='p-2 rounded shadow-2xl bg-yellow-100 w-full'>
                    <h3 className='text-2xl font-bold text-red-600'>To-Do ({todoData.length === 0 ? 0 : todoData.length})</h3>
                    <hr className='w-[100%] h-[2px] mx-auto bg-blue-500' />
                    {
                        isPending && <span className="loading loading-bars loading-xs"></span>
                    }
                    {
                        todoData.map(item => <div className={`relative px-2 overflow-hidden bg-yellow-50 shadow my-2 rounded`} key={item._id}>
                            {
                                (openacordian && item._id === showid) ? <FaMinus onClick={() => {
                                    setShowid(null)
                                    setopenacordian(false)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' /> : <FaPlus onClick={() => {
                                    setShowid(item._id)
                                    setopenacordian(true)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' />
                            }
                            {
                                (openacordian && item._id === showid) && <span className='flex justify-start items-center p-2 gap-2'>
                                    <FaHourglassStart onClick={() => taskStart(item._id)} className='cursor-pointer hover:text-yellow-500' data-tooltip-id={`start_task${item._id}`} data-tooltip-content="start task" />
                                    <FaCheck onClick={() => taskcomplete(item._id)} className='cursor-pointer hover:text-green-600' data-tooltip-id={`complete_task${item._id}`} data-tooltip-content="complete task" />
                                    <Link to={`/dashboard/updatetask/${item._id}`}>
                                        <FaRegEdit className='cursor-pointer hover:text-blue-600' data-tooltip-id={`edit_task${item._id}`} data-tooltip-content="edit task" />
                                    </Link>
                                    <MdDelete onClick={() => taskdelete(item._id)} className='cursor-pointer hover:text-red-600' data-tooltip-id={`delete_task${item._id}`} data-tooltip-content="delete task" /> </span>
                            }
                            <Tooltip id={`start_task${item._id}`} />
                            <Tooltip id={`complete_task${item._id}`} />
                            <Tooltip id={`edit_task${item._id}`} />
                            <Tooltip id={`delete_task${item._id}`} />
                            <h3 className=' py-1 font-semibold pr-2'>{item?.title}</h3>
                            <div className={`${(openacordian && item._id === showid) ? 'h-auto' : 'h-[1px]'} overflow-hidden transition-all`}>
                                <span>
                                    priority : <span className={`${item?.priority === '3' ? 'text-red-600' : item?.priority === '2' ? 'text-yellow-600' : 'text-green-600'} font-semibold`} >
                                        {item?.priority === '3' ? 'high' : item?.priority === '2' ? 'moderate' : 'Low'}
                                    </span></span>
                                <p>deadline : {item.deadline}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>)
                    }
                </div>
                <div className='p-2 rounded shadow-2xl bg-yellow-100 w-full'>
                    <h3 className='text-2xl font-bold text-yellow-500'>Ongoing ({ongoingData.length === 0 ? 0 : ongoingData.length})</h3>
                    <hr className='w-[100%] h-[2px] mx-auto bg-blue-500' />
                    {
                        loadingdata && <span className="loading loading-bars loading-xs"></span>
                    }
                    {
                        ongoingData.map(item => <div className={`relative px-2 overflow-hidden bg-yellow-50 shadow my-2 rounded`} key={item._id}>
                            {
                                (openacordian && item._id === showid) ? <FaMinus onClick={() => {
                                    setShowid(null)
                                    setopenacordian(false)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' /> : <FaPlus onClick={() => {
                                    setShowid(item._id)
                                    setopenacordian(true)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' />
                            }
                            {
                                (openacordian && item._id === showid) && <span className='flex justify-start items-center p-2 gap-2'>
                                    <FaCheck onClick={() => taskcomplete(item._id)} className='cursor-pointer hover:text-green-600' data-tooltip-id={`complete_task${item._id}`} data-tooltip-content="complete task" />
                                    <Link to={`/dashboard/updatetask/${item._id}`}>
                                        <FaRegEdit className='cursor-pointer hover:text-blue-600' data-tooltip-id={`edit_task${item._id}`} data-tooltip-content="edit task" />
                                    </Link>
                                </span>
                            }
                            <Tooltip id={`complete_task${item._id}`} />
                            <Tooltip id={`edit_task${item._id}`} />
                            <h3 className=' py-1 font-semibold pr-2'>{item?.title}</h3>
                            <div className={`${(openacordian && item._id === showid) ? 'h-auto' : 'h-[1px]'} overflow-hidden transition-all`}>
                                <span>
                                    priority : <span className={`${item?.priority === '3' ? 'text-red-600' : item?.priority === '2' ? 'text-yellow-600' : 'text-green-600'} font-semibold`} >
                                        {item?.priority === '3' ? 'high' : item?.priority === '2' ? 'moderate' : 'Low'}
                                    </span></span>
                                <p>deadline : {item.deadline}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>)
                    }
                </div>
                <div className='p-2 rounded shadow-2xl bg-yellow-100 w-full'>
                    <h3 className='text-2xl font-bold text-blue-600'>Completed ({completedData.length === 0 ? 0 : completedData.length})</h3>
                    <hr className='w-[100%] h-[2px] mx-auto bg-blue-500' />
                    {
                        pending && <span className="loading loading-bars loading-xs"></span>
                    }
                    {
                        completedData.map(item => <div className={`relative px-2 overflow-hidden bg-yellow-50 shadow my-2 rounded`} key={item._id}>
                            {
                                (openacordian && item._id === showid) ? <FaMinus onClick={() => {
                                    setShowid(null)
                                    setopenacordian(false)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' /> : <FaPlus onClick={() => {
                                    setShowid(item._id)
                                    setopenacordian(true)
                                }} className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer  hover:text-blue-600' />
                            }
                            {
                                (openacordian && item._id === showid) && <span className='flex justify-start items-center p-2 gap-2'>

                                    <MdDelete onClick={() => taskdelete(item._id)} className='cursor-pointer hover:text-red-600' data-tooltip-id={`delete_task${item._id}`} data-tooltip-content="delete task" /> </span>
                            }
                            <Tooltip id={`delete_task${item._id}`} />
                            <h3 className=' py-1 font-semibold pr-2'>{item?.title}</h3>
                            <div className={`${(openacordian && item._id === showid) ? 'h-auto' : 'h-[1px]'} overflow-hidden transition-all`}>
                                <span>
                                    priority : <span className={`${item?.priority === '3' ? 'text-red-600' : item?.priority === '2' ? 'text-yellow-600' : 'text-green-600'} font-semibold`} >
                                        {item?.priority === '3' ? 'high' : item?.priority === '2' ? 'moderate' : 'Low'}
                                    </span></span>
                                <p>deadline : {item.deadline}</p>
                                <p>{item.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default MyTask
