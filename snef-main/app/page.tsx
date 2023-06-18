"use client";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Link from "next/link";
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
        <main className="w-screen h-screen flex justify-center items-center flex-col space-y-[2vh]">
                <Image src={brand} width={0} height={0} alt={"SNEF brand logo"} className={"w-[10vw] drop-shadow-2xl rounded-md"}/>
            <div className={"flex items-center justify-center space-x-3"}>
                <input
                    placeholder="Prénom et nom d'employé"
                    className="w-[15vw] bg-white border-2 border-neutral-300 drop-shadow-2xl placeholder-neutral-300 rounded-full text-xl outline-none px-[1vw] py-[0.5vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <a target={"_blank"}
                    href={`http://localhost:5001/download/?name=${name}`}
                ><AiOutlineSearch className={"text-4xl text-neutral-800 drop-shadow-xl"} /></a>
                <button onClick={handleClick}><AiOutlineForm className={"text-4xl text-neutral-800 drop-shadow-xl"} /></button>
            </div>

        </main>
    );
};

export default Page;
