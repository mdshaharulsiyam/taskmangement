import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import moment from 'moment';

const MyTask = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [loading, setloading] = useState(false)
    const [showtaskform, setshowtaskform] = useState(false)
    const onSubmit = (data) => {
        data.status = 'todo'
        console.log(data);
        // const {title,description,priority,deadline}=data
    }
    return (
        <div className=''>
            {showtaskform && <>
                <div onClick={() => setshowtaskform(false)} className='bg-black bg-opacity-10 absolute min-h-screen block w-full top-0 left-0'></div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-72 md:w-[50%] flex flex-col items-start gap-2 justify-start  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' >
                    <IoCloseSharp onClick={() => setshowtaskform(false)} className='text-4xl ml-auto cursor-pointer hover:bg-red-600 transition-all' />
                    <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task title" {...register("title", { required: true })} />
                    {errors.title && <p className="text-red-500 ">title is required*</p>}
                    <textarea className="block outline-none border-b-2 w-full resize-none mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task description" {...register("description", { required: true })} />
                    {errors.title && <p className="text-red-500 ">description is required*</p>}
                    <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" {...register("priority", { required: true })}>
                        <option selected disabled value={''} >priority</option>
                        <option value="high">high</option>
                        <option value="moderate">moderate</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.priority && <p className="text-red-500 ">priority is required*</p>}
                    <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="date" placeholder="deadline" {...register("deadline", { required: true })} />
                    {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}
                    <button className="w-full bg-blue-600 cursor-pointer rounded-lg mt-2 text-yellow-400 py-2 hover:bg-blue-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'create'}</button>
                </form>
            </>}
            <button onClick={() => setshowtaskform(true)} className='flex justify-start items-center gap-1 mt-10 mb-2 bg-blue-600 text-yellow-400 hover:bg-blue-800'> <FaPlus />  Add New Task</button>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center'>
                <div>
                    <h3 className='text-2xl font-bold text-center'>To-Do</h3>
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center'>Ongoing</h3>
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center'>completed</h3>
                </div>
            </div>
        </div>
    )
}

export default MyTask
