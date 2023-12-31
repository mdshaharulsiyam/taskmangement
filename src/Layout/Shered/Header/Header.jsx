import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import './header.css'
import { useContext, useEffect, useState } from "react";
import { YourTaskData } from "../../../Context/YourTaskContext";
import { IoNotifications } from "react-icons/io5";
import Notification from "../Notification/Notification";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const Header = () => {
    const [NotificationData, setNotificationData] = useState([])
    const { currentUser, logout } = useContext(YourTaskData)
    const axiosecure = useAxiosSecure()
    // const location = useLocation()
    useEffect(() => {
        if (!currentUser?.useremail) {
            return
        }
        axiosecure.get(`/notification?useremail=${currentUser?.useremail}`)
        .then((res)=>{
            console.log(res.data)
            setNotificationData(res.data)
        })
    }, [currentUser?.useremail])
    const navlink = <>
        <NavLink to={'/'} className={`text-black menus`}>Home</NavLink>
        <NavLink to={'/benifits'} className={`text-black menus`}>Benefits</NavLink>
        <NavLink to={'/dashboard/mytask'} className={`text-black menus`}>My Task</NavLink>
        {
            currentUser?.useremail ? <button onClick={logout} className="active:scale-90">Logout</button> : <NavLink to={'/signup'} className={`text-black menus`}>Sign Up</NavLink>
        }
    </>
    const [CartItemShow, setCartItemShow] = useState(false)
    const showCartItem = () => {
        setCartItemShow(!CartItemShow)
    }
    return (
        <header className="flex relative flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-yellow-200 border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
            <nav className="relative lg:container w-full mx-auto px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between">
                    <Link to={'/'} className="flex-none font-bold text-2xl text-black dark:text-white hidden lg:block" aria-label="Brand">YourTask</Link>
                    <div className="sm:hidden block">
                        <div className="flex justify-end items-center gap-2">
                            <span><img className="w-10 h-10 rounded-full" src={currentUser?.profileImage} alt="" /></span>
                            <button onClick={showCartItem} className="active:scale-90 text-3xl hover:bg-blue-600 hover:bg-opacity-25 bg-transparent p-2 relative"><IoNotifications />
                                <span className="absolute -top-2 bg-red-500 rounded-full text-sm p-1 text-white right-0">{NotificationData.length}</span>
                            </button>
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <button type="button" className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                            <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block">
                    <div id="menuitem" className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-2 sm:mt-0 sm:ps-3">
                        {navlink}
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div className="flex justify-end items-center gap-2">
                        {
                            currentUser?.useremail && <span><img className="w-10 h-10 rounded-full" src={currentUser?.profileImage} alt="" /></span>
                        }
                        <button onClick={showCartItem} className="active:scale-90 text-3xl hover:bg-blue-600 hover:bg-opacity-25 bg-transparent p-2 relative"><IoNotifications />
                            <span className="absolute -top-2 bg-red-500 rounded-full text-sm p-1 text-white right-0">{NotificationData.length}</span>
                        </button>
                    </div>
                </div>
            </nav>
            {
                CartItemShow && <Notification NotificationData={NotificationData} setCartItemShow={setCartItemShow} />
            }
        </header>
    )
}

export default Header
