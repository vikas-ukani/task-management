import React, { useState } from 'react'
import callAxios from '../lib/callAxios'
import Swal from 'sweetalert2'
import { logout } from '@/store/slice/authSlice'
import { useDispatch } from 'react-redux'
import { STATUS } from '@/utils'

export default function TaskForm({
    form,
    setForm,
    updateId,
    setUpdateId,
    tasks,
    setTasks
}: {
    form: {
        _id: string | null | undefined,
        title: string,
        description: string,
        status: string
    },
    setForm: (form: any) => void,
    updateId: string | null,
    setUpdateId: (id: string) => void,
    tasks: ITaskDoc[],
    setTasks: (tasks: any) => void,
}) {

    const dispatch = useDispatch()
    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token || '' == token || null == token) {
            Swal.fire({
                title: 'Error!',
                text: "Please login into your account first.",
                icon: 'error',
                confirmButtonText: 'Okay'
            })
        }

        // const URL = 
        if (form.hasOwnProperty('_id')) {
            // Update
            await callAxios.put(`/tasks/${form._id}`, {
                title: form.title,
                description: form.description,
                status: form.status,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(({ data }: any) => {
                if (data.success) {
                    handleResetForm()
                    let index = tasks.findIndex((task: ITaskDoc) => task._id == form._id)
                    if (index > -1) {
                        tasks[index] = data.task
                        setTasks([...tasks])
                    }
                    Swal.fire({
                        title: 'Success',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })

                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'Okay'
                    })

                }
            })

        } else {
            // Create
            try {
                await callAxios.post('/tasks', form, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(({ data }: any) => {
                    if (data.success) {
                        handleResetForm()
                        setTasks([data.tasks, ...tasks])
                        Swal.fire({
                            title: 'Success',
                            text: data.message,
                            icon: 'success',
                            confirmButtonText: 'Okay'
                        })
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: data.message,
                            icon: 'error',
                            confirmButtonText: 'Okay'
                        })
                    }
                })
            } catch (e: any) {
                console.log('e', e.response)
                if (e.response.data.error.name === "TokenExpiredError") {
                    dispatch(logout())
                }
                Swal.fire({
                    title: 'Error!',
                    text: e.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }
        }
    }

    const handleResetForm = () => {
        setForm({
            title: '',
            description: '',
            status: '',
        })
    }

    return (
        <div className='border border-black p-4 rounded-md shadow-2xl'>
            <p className='text-3xl font-bold w-full underline pb-4 px-2'>Create New Tasks</p>
            <div className='w-full px-2 md:px-4 my-4 text-base font-medium leading-none text-gray-800'>
                <form action="" method='post' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div className='grid md:grid-cols-2 sm:grid-cols-1 flex-1 items-center gap-4'>
                            <div className='space-y-2'>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Title
                                </p>
                                <input type='text' className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    id='title' name='title' onChange={handleChange}
                                    value={form.title} placeholder='Enter task title'
                                />
                            </div>
                            <div className='space-y-2'>
                                <p className="text-base font-medium leading-none text-gray-800">
                                    Status
                                </p>
                                <select name='status' onChange={handleChange} className='border border-gray-300 rounded w-full px-2 py-3 text-base outline-none '
                                    value={form.status} required >
                                    <option value=''>Please select any status</option>
                                    {STATUS.map((item) => (
                                        <option key={item.value} value={item.value} selected={form.status == item.value}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select >
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Description
                            </p>
                            <textarea
                                className="resize-none border border-gray-300 rounded w-full h-[100px] px-4 py-4 text-base outline-none "
                                placeholder='Enter task description'
                                id='description' name='description' onChange={handleChange} value={form.description} required
                            />
                        </div>

                        <div className='flex gap-4 items-center justify-end '>
                            <button type='submit' className="w-40 bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-lg font-medium px-6 py-4 text-white ">
                                Save
                            </button>
                            <button type='reset' onClick={handleResetForm} className="w-40  bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-lg font-medium px-6 py-4 text-indigo-700 border lg:max-w-[95px]  ">
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
