import React from 'react'
import Header from '../Header'
import { persister, store } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

export default function BaseLayout({ children }: {
    children: any
}) {

    return <>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
        <Header />
        <div className=' bg-[#f5efe6] min-h-screen w-full sm:py-8 sm:px-8 py-8 px-8'>
            <div className='max-w-6xl mx-auto'>
                {children}
            </div>
        </div>
        </PersistGate>
    </Provider>
    </>
}
