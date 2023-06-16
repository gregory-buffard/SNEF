"use client";

import {supabase} from "../supabase";
import {useState} from "react";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import {LuClipboardEdit} from "react-icons/lu";
import {number} from "prop-types";

interface Data {
    name: string;
    days: number[];
}

const Page = () => {

    const initData: Data[] = [
        {
            name: "Parking Public",
            days: [0, 0, 0, 0, 0]
        },
        {
            name: "Parking Privée",
            days: [0, 0, 0, 0, 0]
        },
        {
            name: "Maladie",
            days: [0, 0, 0, 0, 0]
        },
        {
            name: "Ferié",
            days: [0, 0, 0, 0, 0]
        },
        {
            name: "Congés",
            days: [0, 0, 0, 0, 0]
        }
    ];
    const [data, setData] = useState(initData);
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    const currentDate: string =
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear();
    const weekAgo: string =
        new Date().getDate() -
        7 +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear();

    return (
        <main
            className="w-2/3 h-screen m-auto flex flex-col justify-center items-center not-italic space-y-6 select-none">
            <div className={"flex flex-col justify-center items-center space-y-2"}>
                <h1 className={"text-4xl text-neutral-800"}>Formulaire de pointage de Testing Subject</h1>
                <h3 className={"border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw]"}>{weekAgo} – {currentDate}</h3>
            </div>

            <div className={"flex flex-row justify-evenly text-base w-max space-y-3 bg-neutral-100 rounded-[1vw] px-[2vw] py-[2vh] drop-shadow-2xl"}>

                {data.map((item, index) => {
                    const setHours = (day: Data) => {
                        let newData = data;
                        newData[index] = day;
                        setData([...newData])
                    }
                    return <Line key={index} data={item} setData={setHours} nav={index == 0 ? days : undefined}/>
                })}

            </div>

            <div className={"w-full flex px-[2vw] justify-between items-center"}>
                <div className={"flex justify-center items-center space-x-2"}><input type={"checkbox"}
                                                                                     className={"cursor-pointer"}
                                                                                     required/><p>Je confirme
                    lexactitude des données ci-dessus et les signe en cochant cette case.</p></div>
                <button type={"submit"}
                        className={"flex justify-center items-center space-x-2 bg-neutral-100 px-[1vw] py-[1vh] rounded-[0.5vw] hover:bg-blue-300 transition duration-200 ease-in-out shadow-inner border-b-2 border-neutral-50"}>
                    <p>Soumettre</p><LuClipboardEdit/></button>
            </div>
        </main>
    );
};

const Line = ({nav, data, setData}: { nav?: string[], data: Data, setData: any }) => {
    return (
        <div className={`relative flex justify-end flex-col items-baseline space-x-3 ${nav?"ml-4 mr-4 ":""} w-full text-center`}>
            <div className={`${nav?"w-50% self-end ":"w-[80%] "} py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg`}>
                {data.name}
            </div>

            {data.days.map((item, index) => {
                const setHours = (hours: number) => {
                    let newDays = [...data.days]
                    newDays[index] = hours
                    let newData = {name: data.name, days: newDays}
                    setData(newData)
                };
                return <Section key={index} item={item} setData={setHours} nav={nav ? nav[index] : undefined}/>
            })}


        </div>
    )
}

const Section = ({item, setData, nav}: { item: number, setData: any, nav?: string }) => {
    return (
        <div className={"flex flex-row w-full py-[1vh]"}>

            {nav && <div className={"flex items-baseline h-full w-full"}>
                <p className={"w-max pr-[1vw] py-[1vh] text-right my-auto "}>{nav}</p>
            </div>
            }

            <div className={"flex justify-center items-center"}>
                <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{item}h</p>
                <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                    <button type={"button"}
                            className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}
                            onClick={() => {
                                setData(item + 1);
                            }}>
                        <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"}/>
                    </button>
                    <button type={"button"}
                            className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}
                            onClick={() => {
                                if (item > 0) setData(item - 1);
                            }}>
                        <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Page;