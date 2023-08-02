"use client";

import React, {useEffect, useState} from "react";
import Cookies, {set} from "js-cookie";
import {AiOutlineForm} from "react-icons/ai";
import Image from "next/image";
import brand from "../public/assets/brand.svg";
import {useRouter} from "next/navigation";
import {PiWarningBold} from "react-icons/pi";
import {FiDownload} from "react-icons/fi";
import {HiOutlineLightBulb} from "react-icons/hi";
import {useUser} from "@clerk/nextjs";

const Page = () => {
    const [name, setName] = useState( ""),
        {user} = useUser(),
        isAdmin = user?.publicMetadata.admin || false as boolean,
    router = useRouter();
    const handleClick = () => {
        switch (true) {
            case (name.includes(',')):
                setAlertBox(!alertBox);
                setTimeout(() => {
                    setAlertBox(false);
                }, 4600);
                break;
            default:
                if (name !== "" && name !== undefined) {
                    Cookies.set("name", name);
                    router.push("/form");
                }
        }
    }

    useEffect(() => {
        if (Cookies.get("name") !== undefined) {
            setName(Cookies.get("name") as string);
        }else if (user?.firstName !== undefined && user?.lastName !== undefined) {
                const userName = user?.firstName + ' ' + user?.lastName as string;
                setName(userName);
            }
    },[user?.firstName, user?.lastName])

    const [alertBox, setAlertBox] = useState(false),
    [darkenBackground, setDarkenBackground] = useState(false),
    [magicLine, setMagicLine] = useState('');
    useEffect(() => {
        const magicLines = ['Effectuez plusieurs téléchargements en séparant les noms et prénoms par une virgule + un espace ", ".', 'Essayez "interim".', 'Essayez "snef".', 'Société Nouvelle Electric Flux (SNEF), cool non ?']
        setMagicLine(magicLines[Math.floor(Math.random()*magicLines.length)]);
    }, [])

    return (
        <main className="w-screen h-screen flex justify-center items-center flex-col space-y-[3vh]">
            <div className={`${darkenBackground ? 'absolute w-screen h-screen bg-neutral-900 z-10 bg-opacity-50 transition-all ease-in-out duration-[2s] backdrop-blur-lg flex justify-center items-center' : 'transition-all ease-in-out duration-1000 hidden'}`}></div>

            <div className={`absolute top-0 z-20 bg-neutral-400 text-neutral-100 bg-opacity-50 border-neutral-400 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] iP:space-x-[1vh] text-[2vh] iP:text-[1.25vh] px-[1vw] iP:px-[1vh] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition-all ease-in-out duration-200 ${darkenBackground ? 'translate-y-[2vw] delay-[3s]' : '-translate-y-[10vw] iP:-translate-y-[20vh] delay-0'}`}>
                <HiOutlineLightBulb className={'text-[1.25vw] iP:text-[3.5vh] drop-shadow-amberish text-amber-300'} />
                <p className={'drop-shadow-whiteish'}>{magicLine}</p>
            </div>

            <div className={`absolute top-0 bg-white-low text-red-600 border-neutral-100 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] text-[2vh] px-[1vw] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition duration-800 ease-in-out iP:text-[1.25vh] backdrop-blur-md drop-shadow-2xl ${alertBox ? "translate-y-[2vw]" : "-translate-y-[10vw] iP:-translate-y-[20vh]"}`}><PiWarningBold className={"text-[1.25vw] iP:text-[1.75vh] drop-shadow-redish"} /><p className={"drop-shadow-redish"}>Le pointage ne peut être effectué que pour une seule personne à la fois.</p></div>

                <Image src={brand} width={0} height={0} alt={"SNEF brand logo"} className={"w-[20vw] drop-shadow-xl iP:w-[35vh]"}/>

            <div className={"flex items-center justify-center flex-col w-[20vw] iP:w-[35vh] space-y-[2vh]"}>
                {isAdmin ? (
                    <input
                        type={'text'}
                        placeholder="Prénom(s) et nom(s)..."
                        onFocus={() => setDarkenBackground(!darkenBackground)}
                        onBlur={() => setDarkenBackground(!darkenBackground)}
                        className="z-20 absolute -translate-y-[1.5vw] w-[20vw] focus:-translate-y-[5vw] iP:-translate-y-[4vh] iP:focus:-translate-y-[20vh] iP:focus:w-[35vh] iP:focus:h-[4vh] focus:w-[30vw] focus:h-[3vw] iP:w-[35vh] bg-white border-2 border-neutral-300 drop-shadow-2xl placeholder-neutral-300 rounded-[1vw] iP:rounded-[2vh] iP:focus:rounded-[1vh] outline-none iP:px-[1vh] px-[0.75vw] h-[2vw] iP:h-[4vh] font-normal text-neutral-800 hover:bg-neutral-300 hover:placeholder-neutral-400 focus:bg-neutral-300 focus:placeholder-neutral-400 transition-all duration-200 ease-in-out text-[1vw] focus:text-[1.5vw] iP:text-[1.5vh] iP:focus:text-[2vh]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (<></>)}
                <div className={'flex justify-center items-center w-full space-x-[0.25vw] iP:space-x-[1vh] text-neutral-800 translate-y-[1.5vw] text-[1vw] iP:text-[2vh]'}>
                        <a className={'flex justify-center items-center bg-neutral-300 w-1/2 h-[2.5vw] iP:h-[5vh] rounded-[0.25vw] iP:rounded-[1vh] space-x-[0.25vw] shadow-inner hover:bg-neutral-400 transition-all duration-200 ease-in-out'} target={"_blank"}
                           href={`https://api.snef.cloud/download/?name=${name}`}
                        ><FiDownload className={"text-[1.25vw] iP:text-[2.5vh] drop-shadow-xl"} /><p>Télécharger</p></a>
                    <button className={'flex justify-center items-center bg-neutral-300 w-1/2 h-[2.5vw] iP:h-[5vh] rounded-[0.25vw] iP:rounded-[1vh] space-x-[0.25vw] shadow-inner hover:bg-neutral-400 transition-all duration-200 ease-in-out'} onClick={handleClick}><AiOutlineForm className={"text-[1.25vw] iP:text-[2.5vh] drop-shadow-xl"} /><p>Modifier</p></button>
                </div>
            </div>
            <div className={'absolute w-full bottom-0 m-auto flex justify-center items-center text-[1vw] iP:text-[1vh]'}><p>&copy; 2023, Cette application est la propriété intellectuelle de Grégory Buffard ; Le logo et la marque <i>SNEF</i> sont la propriété intellectuelle de la Société Nouvelle Electric Flux.</p></div>
        </main>
    );
};

export default Page;
