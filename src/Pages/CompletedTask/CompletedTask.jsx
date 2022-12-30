import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
// Modal Import
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useAuth from '../../Hooks/useAuth';

const CompletedTask = () => {
    const { user } = useAuth()

    const [allTasks, setAllTasks] = useState([])
    const [items, setItems] = useState(true)
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState('')
    // Modal Starts
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(task) {
        setIsOpen(true)
        setTask(task)
    }
    // Modal ends

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_URL}/task?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllTasks(data.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }, [items, user?.email])

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                setItems(!items)
                toast.success(data.message)
            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleNotComplete = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/task?id=${id}&status=${"incomplete"}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => {
                setItems(!items)
                console.log(data);
                toast.success(data.message)
            })
            .catch(err => {
                console.log(err);
            })

    }


    if (loading) {
        return <div>Loading...</div>
    }



    return (
        <>
            <main className='w-[70%] mx-auto'>
                <section className='flex flex-wrap gap-7'>
                    {
                        allTasks?.map((task, i) => {
                            const { img, title, description, _id, status } = task
                            return (
                                status === "complete" &&

                                <div div key={i} className="w-72 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" >

                                    <img className="rounded-t-lg w-full h-44" src={img} alt="" />


                                    <div className="p-5">
                                        <Link onClick={() => handleNotComplete(_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-sm">Not Complete</Link>
                                        <div className='flex justify-between items-center'>
                                            <h5 className="w-[70%] mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title.length > 15 ? title.slice(0, 15) + "..." : title ? title : "Untitled"}</h5>
                                        </div>

                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description.length > 80 ? description.slice(0, 80) + "..." : description}</p>

                                        <div className='flex justify-between items-center'>

                                            <button
                                                onClick={() => openModal(task)}
                                                className="inline-flex items-center px-3 py-2 h-7 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                Details
                                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </button>


                                            <div className='flex items-center gap-2'>

                                                <button onClick={() => handleDelete(_id)}><RiDeleteBin5Fill className='text-3xl text-red-400 hover:text-red-500 cursor-pointer' /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </section>
                {/* Modal Ui */}
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {task?.title ? task?.title : "Untitled"}
                                        </Dialog.Title>

                                        <div>
                                            <img className='h-72 mx-auto' src={task?.img} alt="" />
                                        </div>

                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {task?.description}
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </main>
        </>
    );
};

export default CompletedTask;