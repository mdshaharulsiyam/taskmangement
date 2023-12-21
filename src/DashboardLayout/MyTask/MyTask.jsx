import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const MyTask = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [loading,setloading]=useState(false)
    const onSubmit = (data) => {

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xs'>
                <input className="block outline-none border-b-2 w-full mx-auto p-2 pl-0 border-b-gray-400" type="email" placeholder="Email" {...register("email", { required: true })} />
                {errors.email && <p className="text-red-500 ">email is required*</p>}
               
                
                <button className="w-full bg-red-600 cursor-pointer rounded-lg text-white py-2 hover:bg-red-900 transition-all" type="submit">{loading ? <span className="loading loading-bars loading-xs"></span> : 'Log in'}</button>
            </form>
        </div>
    )
}

export default MyTask
