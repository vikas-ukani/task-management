import React from 'react'

export default function TaskLists({
    tasks,
    setForm,
    setUpdateId,
}: {
    tasks: ITaskDoc[],
    setForm: (form: any) => void,
    setUpdateId: (id: string) => void,
}) {
    const handleEditButton = (task: ITaskDoc) => {
        setUpdateId(task._id)
        setForm(task)
    }

    return (
        <div className='mt-10'>
            <p className='text-3xl font-bold '>All Tasks</p>
            <div className="w-full flex-1 gap-4 items-center" >
                {tasks?.map((task: ITaskDoc) => (
                    <div key={task._id} className='w-full p-4 border border-black  rounded-md shadow-lg my-4 text-base font-medium leading-none text-gray-800'>
                        <div className='font-bold text-black w-full flex items-center justify-between gap-6'>
                            <span>{task.title}</span>
                            <div className='flex items-center gap-4'>
                                <button onClick={() => handleEditButton(task)} className='text-indigo-500 text-sm'>Edit</button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-red-500 cursor-pointer" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>
                        </div>
                        <div className='w-full my-2 text-base text-gray-600'>
                            {task.description}
                        </div>
                        <small><span className='font-bold'>Created on:</span> {new Date(task.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}
