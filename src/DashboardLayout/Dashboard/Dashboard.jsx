import { useContext, useState } from "react"
import { YourTaskData } from "../../Context/YourTaskContext"
import { Link, NavLink, Outlet } from "react-router-dom"
import { GrTask } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
const Dashboard = () => {
    const { currentUser } = useContext(YourTaskData)
    const userMenu = <>
        <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-800 dark:text-gray-50">
                <NavLink to={'mytask'} className="flex items-center p-2 space-x-3 rounded-md">
                    <FaTasks className="text-2xl" />
                    <span>My Task</span>
                </NavLink>
            </li>
            <li className="dark:bg-gray-800 dark:text-gray-50">
                <NavLink to={'prevtask'} className="flex items-center p-2 space-x-3 rounded-md">
                    <GrTask className="text-2xl" />
                    <span>previous Task</span>
                </NavLink>
            </li>

        </ul></>
        const [showmenu,setshowmenu]=useState(false)
    return (
        <div className='text-left md:grid md:grid-cols-4 container mx-auto pt-10 relative'>
            <div className={`h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100 ${showmenu?'h-[300px]':'h-0'} md:min-h-screen overflow-hidden transition-all`}>
                    <div className="flex items-center p-2 space-x-4">
                        <img src={currentUser?.profileImage} alt="" className={`md:w-12 h-12 ${showmenu?'w-12':'w-0'} rounded-full dark:bg-gray-500 transition-all`} />
                        <div>
                            <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
                            <span className="flex items-center space-x-1">
                                <p rel="noopener noreferrer" className="text-xs hover:underline dark:text-gray-400">{currentUser?.role}</p> <span className="h-2 w-2 rounded-full bg-green-600"></span>
                            </span>
                        </div>
                    </div>
                <IoMenu onClick={()=>{
                    setshowmenu(!showmenu)
                }} className={`absolute top-[60px] right-7 ${showmenu?'rotate-90':'rotate-0'} transition-all text-4xl md:hidden`}/>
                <div className="divide-y dark:divide-gray-700 menues">
                    {
                        userMenu
                    }
                    <ul className="pt-4 pb-2 space-y-1 text-sm">
                        <li>
                            <Link to={'/'} className="flex items-center p-2 space-x-3 rounded-md">
                                <FaHome className="text-2xl" />
                                <span>Home</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-span-3">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
