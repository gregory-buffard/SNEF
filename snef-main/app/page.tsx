"use client";

import React, {useEffect, useState} from "react";
import Cookies, {set} from "js-cookie";
import {AiOutlineSearch, AiOutlineForm} from "react-icons/ai";
import Image from "next/image";
import brand from "../public/assets/brand.svg";
import {useRouter} from "next/navigation";
import {PiWarningBold} from "react-icons/pi";

const Page = () => {
    const [name, setName] = useState( "");
    const router = useRouter();
    const handleClick = () => {
        if (name.includes(",")) {
            setAlertBox(!alertBox);
            setTimeout(() => {
                setAlertBox(false);
            }, 4600);
        } else {
            Cookies.set("name", name);
            router.push("/form");
        }
    }

    useEffect(() => {
        if (Cookies.get("name")) {
            setName(Cookies.get("name") as string);
        }
    },[])

    const [alertBox, setAlertBox] = useState(false);

    return (
        <main className="w-screen h-screen flex justify-center items-center flex-col space-y-[2.5vh]">
            <div className={`absolute top-0 bg-white-low text-red-600 border-neutral-100 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] text-[2vh] px-[1vw] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition duration-800 ease-in-out iP:text-[1.25vh] backdrop-blur-md drop-shadow-2xl ${alertBox ? "translate-y-[2vw]" : "-translate-y-[10vw] iP:-translate-y-[10vh]"}`}><PiWarningBold className={"text-[1.25vw] iP:text-[1.75vh] drop-shadow-redish"} /><p className={"drop-shadow-redish"}>Le pointage ne peut être effectué que pour une seule personne à la fois.</p></div>
                <Image src={brand} width={0} height={0} alt={"SNEF brand logo"} className={"w-[10vw] drop-shadow-2xl rounded-md iP:w-[15vh]"}/>
            <div className={"flex items-center justify-center space-x-3"}>
                <input
                    placeholder="Prénom(s) et nom(s)"
                    className="w-[15vw] iP:w-[30vh] bg-white border-2 border-neutral-300 drop-shadow-2xl placeholder-neutral-300 rounded-full text-xl outline-none px-[1vw] iP:px-[1.5vh] py-[0.5vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out text-[2vh] iP:text-[1.5vh]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <a target={"_blank"}
                    href={`https://api.snef.cloud/download/?name=${name}`}
                ><AiOutlineSearch className={"text-[2vw] iP:text-[3vh] text-neutral-800 drop-shadow-xl"} /></a>
                <button onClick={handleClick}><AiOutlineForm className={"text-[2vw] iP:text-[3vh] text-neutral-800 drop-shadow-xl"} /></button>
            </div>
        </main>
    );
};

export default Page;
