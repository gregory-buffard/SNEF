"use client";

import {useEffect, useState} from "react";
import {IoIosArrowUp, IoIosArrowDown, IoIosArrowBack} from "react-icons/io";
import {LuClipboardEdit} from "react-icons/lu";
import {TfiMenuAlt} from "react-icons/tfi";
import Cookies from "js-cookie";
import axios from "axios";
import {CgClose} from "react-icons/cg";
import Link from "next/link";


interface Data {
    name: string;
    days: number[];
}

const Page = () => {
        const initData: { name: string, schedule: Data[] } = {
            name: "",
            schedule: [
                {
                    name: "Parking Public",
                    days: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: "Parking Privée",
                    days: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: "Maladie",
                    days: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: "Ferié",
                    days: [0, 0, 0, 0, 0, 0, 0],
                },
                {
                    name: "Congés",
                    days: [0, 0, 0, 0, 0, 0, 0],
                },
            ]
        }
        const [data, setData] = useState(initData);
        const [loading, setLoading] = useState(true);

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

        const [menu, setMenu] = useState("translate-x-[-10vw] iP:translate-x-[-100vw]");

        useEffect(() => {
            const name = Cookies.get("name")
            if (name == undefined) {
                window.location.href = "/"
                return
            }
            axios.get(`http://localhost:5001/worker/?name=${name}`).then((res) => {
                console.log(res.data)
                setData({
                    name: name,
                    schedule: (res.data.schedule && res.data.schedule.length >0 ? res.data.schedule : initData.schedule)
                })
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }, [])

        return (
            <main
                className="w-1/2 iP:w-11/12 h-screen m-auto flex flex-col justify-center items-center not-italic space-y-[3vh] select-none">
                {loading ?
                    <div className={"w-screen h-screen flex justify-center items-center"}><p>Chargement...</p></div> : (
                        <>
                            <button
                                type={"button"}
                                className={
                                    "absolute left-[2vw] top-[2vh] bg-neutral-100 px-[0.25vw] py-[0.25vw] rounded-[0.25vw] hover:bg-neutral-300 shadow-inner iP:text-[3vh] iP:px-[1.5vw] iP:py-[1.5vw] iP:rounded-[2vw]"
                                }
                                onClick={() => {
                                    if (menu == "translate-x-[-10vw] iP:translate-x-[-100vw]") {
                                        setMenu("translate-x-[2vw] iP:translate-x-[0vw]");
                                    } else {
                                        setMenu("translate-x-[-10vw] iP:translate-x-[-100vw]");
                                    }
                                }}
                            >
                                <TfiMenuAlt/>
                            </button>
                            <Link href={"http://46.101.163.137/"} className={"absolute left-[4vw] iP:left-[14vw] -top-[1vh] bg-neutral-100 px-[0.25vw] py-[0.25vw] rounded-[0.25vw] hover:bg-neutral-300 shadow-inner iP:text-[3vh] iP:px-[1.5vw] iP:py-[1.5vw] iP:rounded-[2vw]"}><IoIosArrowBack /></Link>
                            <div
                                className={
                                    "absolute bg-neutral-100 iP:bg-snef iP:backdrop-blur-md px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg iP:drop-shadow-none top-[3vh] iP:top-[-3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 " +
                                    menu
                                }
                            >
                                <button type={"button"} onClick={() => {
                                    setMenu("translate-x-[-10vw] iP:translate-x-[-100vw]")
                                }} className={"hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"}><CgClose /></button>
                                <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Parking Public</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Parking Privée</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Maladie</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Ferié</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Congés</p>
                                </div>
                            </div>
                            <div className={"flex flex-col justify-center items-center space-y-2"}>
                                <h1 className={"text-[1.5vw] iP:text-[2vh] text-neutral-800"}>
                                    Formulaire de pointage de {data.name}
                                </h1>
                                <h3
                                    className={
                                        "border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw] text-[0.6vw] iP:text-[1.5vh] iP:rounded-[1vh] iP:px-[1vw]"
                                    }
                                >
                                    {weekAgo} – {currentDate}
                                </h3>
                            </div>

                            <div
                                className={
                                    "flex text-[0.6vw] space-x-[1vw] iP:space-x-[5vh] bg-neutral-100 rounded-[1vw] iP:rounded-[1vh] px-[2vw] iP:px-[4vw] py-[2vh] iP:py-[3vh] drop-shadow-2xl iP:w-[90vw] iP:overflow-auto iP:text-[1.5vh] iP:whitespace-nowrap scrollbarStyle"
                                }
                            >
                                <WeekCol />
                                {data.schedule.map((item, index) => {
                                    const setHours = (day: Data) => {
                                        let newData = data.schedule;
                                        newData[index] = day;
                                        setData({name: data.name, schedule: newData});
                                    };
                                    return (
                                        <Line
                                            key={index}
                                            data={item}
                                            setData={setHours}
                                        />
                                    );
                                })}
                            </div>

                            <div className={"w-full flex px-[2vw] justify-between items-center text-[0.6vw] iP:text-[1.5vh]"}>
                                <div className={"flex justify-center items-center space-x-[1vw] iP:space-x-[2vh] iP:w-[60vw]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"} required/>
                                    <p>
                                        Je confirme lexactitude des données ci-dessus et les signe en
                                        cochant cette case.
                                    </p>
                                </div>
                                <button
                                    type={"submit"}
                                    onClick={() => {
                                        console.log(data);
                                        axios.post("http://localhost:5001/schedule", {
                                            name: data.name,
                                            schedule: data.schedule
                                        }).then((res) => {
                                            console.log(res.data)
                                        }).catch((err) => {
                                            console.log(err)
                                        })
                                    }}
                                    className={
                                        "flex justify-center items-center space-x-[1vw] bg-neutral-100 px-[1vw] iP:px-[2vw] py-[1vh] rounded-[0.5vw] iP:rounded-[1vh] hover:bg-[#005350] hover:bg-opacity-50 hover:text-neutral-100 transition duration-200 ease-in-out shadow-inner border-b-2 border-neutral-50"
                                    }
                                >
                                    <p>Soumettre</p>
                                    <LuClipboardEdit/>
                                </button>
                            </div>
                        </>)}
            </main>
        );
    }
;

const WeekCol = () => {
    const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
    ];

    return (
        <div className={"flex flex-col justify-around items-end pt-[4vh]"}>
            {days.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`flex justify-center items-center`}
                    >
                        {item}
                    </div>
                );
            })
            }
        </div>
    );
}

const Line = ({
                  data,
                  setData,
              }: {
    data: Data;
    setData: any;
}) => {
    return (
        <div
            className={`flex flex-col items-center w-full text-center`}
        >
            <div
                className={`bg-neutral-50 rounded-[0.5vw] drop-shadow-lg w-[9vw] iP:w-[22vw] h-[4vh] flex justify-center items-center iP:rounded-[1.25vh]`}            >
                {data.name}
            </div>

            {data.days.map((item, index) => {
                const setHours = (hours: number) => {
                    let newDays = [...data.days];
                    newDays[index] = hours;
                    let newData = {name: data.name, days: newDays};
                    setData(newData);
                };
                return (
                    <Section
                        key={index}
                        item={item}
                        setData={setHours}
                    />
                );
            })}
        </div>
    );
};

const Section = ({
                     item,
                     setData,
                 }: {
    item: number;
    setData: any;
}) => {
    /*{nav && (
        <p className={"text-right"}>{nav}</p>
    )}*/
    return (
        <div className={"flex my-[1vh]"}>
            <div className={"flex justify-center items-center"}>
                <p className={"px-[1vw] iP:px-[2vw] py-[1vh] iP:py-[0.5vh] bg-neutral-50 shadow-inner rounded-l-[0.5vw] iP:rounded-l-[1vh]"}>
                    {item}h
                </p>
                <div
                    className={"flex flex-col justify-center items-center drop-shadow-lg"}
                >
                    <button
                        type={"button"}
                        className={
                            "bg-neutral-50 rounded-t-[0.5vw] iP:rounded-t-[1vh] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
                        }
                        onClick={() => {
                            setData(item + 1);
                        }}
                    >
                        <IoIosArrowUp className={"text-[1vw] iP:text-[3vh] mx-[0.5vw] h-[2.5vh]"}/>
                    </button>
                    <button
                        type={"button"}
                        className={
                            "bg-neutral-50 rounded-b-[0.5vw] iP:rounded-b-[1vh] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
                        }
                        onClick={() => {
                            if (item > 0) setData(item - 1);
                        }}
                    >
                        <IoIosArrowDown className={"text-[1vw] iP:text-[3vh] mx-[0.5vw] h-[2.5vh]"}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
