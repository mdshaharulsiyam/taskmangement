import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='bg-[url(https://i.ibb.co/9wpFX5f/d4eaf149-task-management.png)] py-10 bg-cover bg-no-repeat min-h-screen relative z-20'>
            <span className='h-full w-full bg-black absolute top-0 left-0 bg-opacity-50 -z-10'></span>
            <div className='container mx-auto z-20 text-yellow-400 grid md:grid-cols-2 gap-3 items-center justify-center min-h-screen'>
                <div>
                    <h3 className='text-2xl md:text-3xl pb-5'>Empower Your Productivity with YourTask Collaborative Task Management Made Effortless</h3>
                    <p className='text-base'>Welcome to YourTask, where seamless collaboration meets efficient task management. TaskHub provides a user-friendly platform designed to enhance your productivity. From creating tasks with detailed information to effortlessly managing them through intuitive drag-and-drop functionality, TaskHub simplifies your daily workflow. Join TaskHub and experience a new era of collaborative task management. Let's make every task a step towards success</p>
                    <Link><button className='bg-blue-600 mt-3'>Let’s Explore</button></Link>
                </div>
                <div className='flex items-center justify-end'>
                    <img className='max-w-xs' src="https://i.ibb.co/7VhctKH/2098402.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner
