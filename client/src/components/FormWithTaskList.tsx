import React from 'react'
import TaskForm from './TaskForm'
import TaskLists from './TaskLists'

export default function FormWithTaskList({
    form,
    setForm,
    updateId,
    setUpdateId,
    tasks,
    setTasks,
}: {
    form: any,
    updateId: any,
    tasks: any,
    setForm: (form: any) => void,
    setUpdateId: (id: string) => void,
    setTasks: (task: any) => void,
}) {
    return (
        <>
            <TaskForm form={form} setForm={setForm}
                updateId={updateId} setUpdateId={setUpdateId}
                tasks={tasks} setTasks={setTasks}
            />
            <TaskLists tasks={tasks} setTasks={setTasks} setForm={setForm} setUpdateId={setUpdateId} />
        </>
    )
}
