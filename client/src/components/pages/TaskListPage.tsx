

import React, { useEffect, useState } from 'react'
import callAxios from '@/lib/callAxios'
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
                await callAxios.get('/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(({data}: any) => {
                    if (data.status) {
                        setTasks(data.tasks)
                    } else {
                        setTasks([])
                    }
                })
            } catch (e: any) {
                setErrorMessage(e.response.data.message)
            }
        }
        fetchTasks()
    }, [token])


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

