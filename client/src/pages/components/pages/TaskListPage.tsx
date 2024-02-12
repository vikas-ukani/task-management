

import React, { useEffect, useState } from 'react'
import TaskForm from '../TaskForm'
import callAxios from '@/pages/lib/callAxios'
import TaskLists from '../TaskLists'
import GoogleLogin from '../GoogleLogin'
import { useSelector } from 'react-redux'
import FormWithTaskList from '../FormWithTaskList'

export default function TaskListPage() {
    const { token, user } = useSelector((store: any) => store.auth)
    const [form, setForm] = useState<ITask>({
        title: '',
        description: '',
        status: '',
    })
    const [updateId, setUpdateId] = useState('')
    const [tasks, setTasks] = useState<ITaskDoc[]>([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setErrorMessage('')
                const { data, status } = await callAxios.get('/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (status === 200) {
                    setTasks(data.tasks)
                } else {
                    setTasks([])
                }
            } catch (e: any) {
                setErrorMessage(e.response.data.message)
            }
        }
        fetchTasks()
    }, [])


    return <>


        {token == null && <div className='w-full p-4 border border-black rounded-xl shadow-2xl text-red-500 text-center my-8 text-xl font-extrabold'>
            {errorMessage}
            <div className='w-1/3 mx-auto my-6 border-black text-center'>
                <GoogleLogin />
            </div>
        </div>}

        {token !== null && token.length > 0 && <FormWithTaskList
            form={form} setForm={setForm}
            updateId={updateId} setUpdateId={setUpdateId}
            tasks={tasks} setTasks={setTasks}
        />}
    </>
}

