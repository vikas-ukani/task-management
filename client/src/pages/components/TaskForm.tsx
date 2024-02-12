import React, { useState } from 'react'
import { STATUS } from '../../utils'
import callAxios from '../lib/callAxios'
import Swal from 'sweetalert2'


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
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        const token = localStorage.getItem('token')
        if (!token || '' == token || null == token) {
            setError("Please login into your account first.")
        }

        // const URL = 
        if (form.hasOwnProperty('_id')) {
            // Update
            const { data } = await callAxios.put(`/tasks/${form._id}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success == false) {
                setError(data.message)
            } else {
                handleResetForm()
                let index = tasks.findIndex((task: ITaskDoc) => task._id == form._id)
                if(index > -1) {
                    tasks[index] = data.task
                    setTasks([...tasks])
                }
                // setTasks([data.task, ...tasks])
                setSuccess(data.message)
            }
        } else {
            // Create
            try {
                const { data } = await callAxios.post('/tasks', form, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (data.success == false) {
                    setError(data.message)
                } else {
                    handleResetForm()
                    setTasks([data.task, ...tasks])
                    setSuccess(data.message)
                }
            } catch (e: any) {
                console.log('e', e.response.data.message)
                Swal.fire({
                    title: 'Error!',
                    text: e.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                setError(e.response.data.message)
            }
        }
    }

    const handleResetForm = () => {
        setForm({
            title: '',
            description: '',
            status: '',
        })
        setError('')
    }

    return (
        <div>
            <p className='text-3xl font-bold '>Create New Tasks</p>
            {error && <p className='text-lg font-bold  text-red-500'>{error}</p>}
            {success && <p className='text-lg font-bold  text-green-700'>{success}</p>}
            <div className='w-full p-4 border border-black  rounded-md shadow-lg my-4 text-base font-medium leading-none text-gray-800'>
                <form action="" method='post' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Title
                            </p>
                            <input className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                id='title' name='title' onChange={handleChange} defaultValue={form.title} required
                                placeholder='Enter task title'
                            />
                        </div>
                        <div className='space-y-2'>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Description
                            </p>
                            <textarea
                                className="resize-none border border-gray-300 rounded w-full h-[100px] px-4 py-4 text-base outline-none "
                                placeholder='Enter task description'
                                id='description' name='description' onChange={handleChange} defaultValue={form.description} required
                            />
                        </div>
                        <div className='space-y-2'>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Status
                            </p>
                            <select name='status' onChange={handleChange} className='border border-gray-300 rounded w-full px-2 py-4 text-base outline-none '
                                defaultValue={form.status} required >
                                <option value=''>Please select any status</option>
                                {STATUS.map((item) => (
                                    <option key={item.value} value={item.value} >
                                        {/*  selected={form.status == item.value} */}
                                        {item.value}
                                    </option>
                                ))}
                            </select >
                        </div>
                        <div className='flex gap-4 items-center justify-between '>
                            <button type='submit' className="w-1/3 bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-lg font-medium px-6 py-4 text-white ">
                                Save
                            </button>
                            <button type='reset' onClick={handleResetForm} className="w-1/3 bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-lg font-medium px-6 py-4 text-indigo-700 border lg:max-w-[95px]  ">
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
