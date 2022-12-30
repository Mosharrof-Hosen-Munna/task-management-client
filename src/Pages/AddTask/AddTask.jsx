import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCardImage } from "react-icons/bs"
import { MdAddCircle } from "react-icons/md"
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';


const AddTask = () => {
    const { user } = useAuth()
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [taskLoading, setTaskLoading] = useState(false)

    const handleSubmit = (e) => {
        setTaskLoading(false)
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const taskImage = image
        const task = { title, description, img: taskImage, status: "incomplete", email: user?.email }
        console.log(task);

        if (!taskImage) {
            // toast.success("Please upload an image")
            toast('Please Upload An Image!', {
                icon: '⚠️',
            });
            return
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/task`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(res => res.json())
            .then(data => {

                if (data?.status) {
                    setTaskLoading(false)
                    toast.success(data?.message)
                    form.reset()
                    setImage("")
                }
            })
            .catch(err => {
                console.error(err);
                setTaskLoading(false)
            })
    }

    const handleImageChange = (e) => {
        setImageLoading(true)
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append("image", image)

        const url = `https://api.imgbb.com/1/upload?key=86634dfbed78c297520e5a0dba91837d`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setImage(data.data.display_url)
                setImageLoading(false)
            })
            .catch(err => {
                console.error(err)
                setImageLoading(false)
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='p-4 w-1/3 mx-auto shadow-lg shadow-gray bg-white rounded-md'>
            <div className='text-center font-bold text-xl mb-3'> Add New Task</div>
                <div className='text-xs mt-4 text-slate-600 mb-2'>Task Title</div>
                <input name="title" type="text" className='w-full pl-2  outline-dashed outline-2 outline-slate-200 text-gray-500 p-1 font-semibold border-none text-lg focus:ring-0' placeholder='Title' /> <br />
                <div className='text-xs mt-4 text-slate-600 mb-2'>Task Description</div>

                <textarea name="description" type="text" className='w-full pl-2  outline-dashed outline-2 outline-slate-200 text-gray-500 p-1 font-semibold border-none text-lg focus:ring-0' placeholder='Add Your Task' required />

                <div className='flex justify-between items-center'>
                    <label htmlFor='image'>
                        <input onChange={handleImageChange} name='taskImage' id='image' className='hidden' type="file" />
                        {
                            imageLoading ?
                               <div>loading....</div>
                                :
                                image ? <img className='w-24 h-14' src={image} alt="" />
                                    : <BsCardImage className='text-gray-500 text-2xl cursor-pointer' />

                        }
                    </label>
                    <div className='flex items-center'>

                        {
                            user ?
                                <button><MdAddCircle className='text-4xl mx-1 text-green-400 cursor-pointer' /></button>
                                :
                                <>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center px-3 py-2 h-7 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                        Login to add task
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </Link>
                                </>
                        }

                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddTask;