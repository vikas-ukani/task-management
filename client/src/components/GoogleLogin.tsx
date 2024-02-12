

import React from 'react'
import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import callAxios from '../lib/callAxios';
import { login } from '@/store/slice/authSlice';
import { useDispatch } from 'react-redux';

export default function GoogleLogin() {
    const dispatch = useDispatch()

    const handleLogin = async () => {
        const user: any = await signInWithPopup(auth, provider);
        console.log('user', user);
        if (user.user.emailVerified) {
            const { data } = await callAxios.post('/auth/google', {
                accessToken: user.user.accessToken,
                email: user.user.email,
                name: user.user.displayName,
            })
            if (data.token) {
                dispatch(login({ token: data.token, user: data.user }))
                console.log('data.token', data.token)
                localStorage.setItem('token', data.token)
            }
        }
    }

    return (
        <button type='button' onClick={handleLogin} className="rounded-md flex space-x-2 w-full h-10 px-4 font-normal text-sm leading-3 text-black-700 bg-black-600 bg-opacity-0 hover:opacity-100  border border-black focus:outline-none focus:bg-gray-200 hover:bg-yellow-100/50 duration-150 justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-google h-4 w-4"
                viewBox="0 0 16 16"
            >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
            <span>Login with Google</span>
        </button>
    )
}
