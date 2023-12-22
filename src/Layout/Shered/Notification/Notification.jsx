import { MdOutlineLocalShipping } from "react-icons/md";
import { Link } from "react-router-dom"

const Notification = ({ NotificationData }) => {
    return (
        <div className="flex flex-col max-w-3xl p-3 bg-gray-900 absolute top-[75px] right-20">
            <h2 className="text-xl font-semibold text-white">Your Notifications</h2>
            <p className="text-white py-2">{NotificationData.length>0 ?"today is deadline for this task": 'no notifications'}</p>
            <ul className="flex flex-col list-disc divide-y dark:divide-gray-700">
                {
                    NotificationData.map(item => <span key={item._id} className={` py-2 text-white`}>
                      <p className={`${item.status==='todo'?'text-red-600':'text-yellow-400'}`}>{item.title}</p>
                      <p >status : <span className={`${item.status==='todo'?'text-red-600':'text-yellow-400'}`}>{item.status}</span></p>
                      <hr className={` w-full h-1`}/>
                    </span>)
                }
            </ul>
        </div>
    )
}

export default Notification
