import React, { useContext, useState } from 'react'
import useGetPrevTask from '../../Hooks/useGetPrevTask'
import { YourTaskData } from '../../Context/YourTaskContext'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const PreviousTask = () => {
    document.title = 'YourTask | previous task'
    const { currentUser } = useContext(YourTaskData)
    const [isPending, taskData, refetch] = useGetPrevTask(currentUser?.useremail)
    const [openacordian, setopenacordian] = useState(false)
    const [showid, setShowid] = useState(null)
    const axiosecure = useAxiosSecure()
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
                            refetch()
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
    console.log(openacordian,showid);
    return (
        <div className='container mx-auto min-h-screen pt-12'>
            <h3 className='text-2xl font-semibold'>previous tasks ({taskData.length === 0 ? 0 : taskData.length})</h3>
            <div className='flex justify-start items-center gap-2 text-green-600 font-semibold'>completed <div className='w-16 bg-green-300 h-2'></div></div>
            <div className='flex justify-start items-center gap-2 text-red-600 font-semibold'>uncomplete <div className='w-16 bg-red-300 h-2'></div></div>

            {
                isPending && <span className="loading loading-ring absolute w-36 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  block "></span>
            }

            <div className=''>
                {
                    taskData.map(item => <div className={`relative px-2 overflow-hidden ${item.status === 'completed' ? 'bg-green-300' : 'bg-red-300'} shadow-2xl my-2 rounded`} key={item._id}>
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
                            <p className='font-semibold'>
                                status : {
                                    item.status === 'completed' ? 'completed' : 'uncompleted'
                                }
                            </p>
                            <p>deadline : {item.deadline}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default PreviousTask
