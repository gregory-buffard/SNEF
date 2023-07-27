'use client';

import { signIn } from "next-auth/react"
import { useState } from "react";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import {HiOutlineLogin} from 'react-icons/hi';

const Page = () => {
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    });
    const router = useRouter();
    const {username, password } = userInfo;
    const onChange = (e:any) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });
        if (res?.error) return setError(res.error);
        router.replace('/');
    };
    return (
        <section className={'w-screen h-screen flex justify-center items-center flex-col m-auto'}>
            <form className={'flex justify-center items-center flex-col space-y-[2vh] bg-neutral-100 px-[1vw] py-[2vh] rounded-[1vw] drop-shadow-2xl'} onSubmit={handleSubmit}>
                <input type={'text'} placeholder={'Identifiant'} className={'w-[15vw] iP:w-[35vh] bg-white border-2 border-neutral-300 shadow-inner placeholder-neutral-300 rounded-[1vw] iP:rounded-[2vh] outline-none iP:px-[1vh] px-[0.75vw] h-[2vw] iP:h-[4vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out text-[1vw] iP:text-[1.5vh]'} />

                <input type={'password'} placeholder={'Mot de passe'} className={'w-[15vw] iP:w-[35vh] bg-white border-2 border-neutral-300 shadow-inner placeholder-neutral-300 rounded-[1vw] iP:rounded-[2vh] outline-none iP:px-[1vh] px-[0.75vw] h-[2vw] iP:h-[4vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out text-[1vw] iP:text-[1.5vh]'} />

                <button type={'submit'} className={'flex justify-start items-center space-x-[0.25vw] text-[1vw] bg-neutral-300 hover:bg-neutral-400 transition-colors ease-in-out duration-200 px-[0.75vw] py-[0.5vh] rounded-[0.75vw] shadow-inner'}><HiOutlineLogin className={'text-[1.25vw]'} /><p>Connecter</p></button>
            </form>
        </section>
    )
}

export default Page;