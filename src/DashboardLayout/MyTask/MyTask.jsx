import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const MyTask = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [loading, setloading] = useState(false)
    const onSubmit = (data) => {
console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xs'>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task title" {...register("title", { required: true })} />
                {errors.title && <p className="text-red-500 ">title is required*</p>}
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="text" placeholder="Task description" {...register("description", { required: true })} />
                {errors.title && <p className="text-red-500 ">description is required*</p>}
                <select className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" {...register("priority",{ required: true })}>
                    <option selected disabled value={''} >priority</option>
                    <option value="high">high</option>
                    <option value="moderate">moderate</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500 ">priority is required*</p>}
                <p>deadline</p>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="date" placeholder="deadline" {...register("deadline", { required: true })} />
                {errors.deadline && <p className="text-red-500 ">deadline is required*</p>}


                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'Log in'}</button>
            </form>
        </div>
    )
}

export default MyTask
