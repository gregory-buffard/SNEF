"use client";

import React, {useEffect, useState} from "react";
import Cookies, {set} from "js-cookie";
import {AiOutlineSearch, AiOutlineForm} from "react-icons/ai";
import Image from "next/image";
import brand from "../public/assets/brand.svg";
import {useRouter} from "next/navigation";

const Page = () => {
    const [name, setName] = useState( "");
    const router = useRouter();
    const handleClick = () => {
        Cookies.set("name", name);
        router.push("/form");
    }

    useEffect(() => {
        if (Cookies.get("name")) {
            setName(Cookies.get("name") as string);
        }
    },[])

    return (
        <main className="w-screen h-screen flex justify-center items-center flex-col space-y-[2.5vh]">
                <Image src={brand} width={0} height={0} alt={"SNEF brand logo"} className={"w-[10vw] drop-shadow-2xl rounded-md iP:w-[15vh]"}/>
            <div className={"flex items-center justify-center space-x-3"}>
                <input
                    placeholder="Prénom(s) et nom(s)"
                    className="w-[15vw] iP:w-[30vh] bg-white border-2 border-neutral-300 drop-shadow-2xl placeholder-neutral-300 rounded-full text-xl outline-none px-[1vw] iP:px-[1.5vh] py-[0.5vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out text-[2vh] iP:text-[1.5vh]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <a target={"_blank"}
                    href={`http://localhost:5001/download/?name=${name}`}
                ><AiOutlineSearch className={"text-[2vw] iP:text-[3vh] text-neutral-800 drop-shadow-xl"} /></a>
                <button onClick={handleClick}><AiOutlineForm className={"text-[2vw] iP:text-[3vh] text-neutral-800 drop-shadow-xl"} /></button>
            </div>

        </main>
    );
};

export default Page;
