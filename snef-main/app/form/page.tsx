"use client";

import React, {useEffect, useState} from "react";
import {IoIosArrowUp, IoIosArrowDown, IoIosArrowBack} from "react-icons/io";
import {LuClipboardEdit} from "react-icons/lu";
import {TfiMenuAlt} from "react-icons/tfi";
import Cookies from "js-cookie";
import axios from "axios";
import {CgClose} from "react-icons/cg";
import Link from "next/link";
import Menu from "./Menu";
import {PiWarningBold} from "react-icons/pi";


export interface Data {
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
        const dateAWeekAgo = new Date();
        dateAWeekAgo.setDate(dateAWeekAgo.getDate() - 7);
        const weekAgo: string =
            dateAWeekAgo.getDate() +
            "/" +
            (dateAWeekAgo.getMonth() + 1) +
            "/" +
            dateAWeekAgo.getFullYear();


    const [menu, setMenu] = useState(false);

        useEffect(() => {
            const name = Cookies.get("name")
            if (name == undefined) {
                window.location.href = "/"
                return
            }
            axios.get(`https://api.snef.cloud/worker/?name=${name}`).then((res) => {
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

        const [alertBox, setAlertBox] = useState(false);
        const [signature, setSignature] = useState(false);

    interface WorkspaceVisibility {
        [key: string]: boolean;
    }

    const [workspaceVisibility, setWorkspaceVisibility] = useState(() => {
        const initialVisibility: WorkspaceVisibility = {};
        data.schedule.forEach(workspace => {
            initialVisibility[workspace.name] = true;
        });
        return initialVisibility;
    });

    useEffect(() => {
        const newVisibility: WorkspaceVisibility = {};
        data.schedule.forEach(workspace => {
            newVisibility[workspace.name] = workspaceVisibility[workspace.name] ?? true;
        });
        setWorkspaceVisibility(newVisibility);
    }, [data.schedule]);


    return (
            <main
                className="w-1/2 iP:w-11/12 h-screen m-auto flex flex-col justify-center items-center not-italic space-y-[3vh] select-none">
                {loading ?
                    <div className={"w-screen h-screen flex justify-center items-center"}><p>Chargement...</p></div> : (
                        <>
                            <div className={`absolute top-0 bg-white-low text-red-600 border-neutral-100 border-[0.25vh] flex justify-center items-center space-x-[0.5vw] text-[2vh] px-[1vw] py-[0.5vh] rounded-[0.75vw] iP:rounded-[1vh] transition duration-800 ease-in-out iP:text-[1.25vh] z-10 backdrop-blur-md drop-shadow-2xl ${alertBox ? "translate-y-[2vw]" : "-translate-y-[10vw] iP:-translate-y-[10vh]"}`}><PiWarningBold className={"text-[1.25vw] iP:text-[1.75vh] drop-shadow-redish"} /><p className={"drop-shadow-redish"}>Veuillez cocher la case de signature pour soumettre les données.</p></div>
                            <button
                                type={"button"}
                                className={
                                    "absolute left-[2vw] top-[-1vh] bg-neutral-100 px-[0.25vw] py-[0.25vw] rounded-[0.25vw] hover:bg-neutral-300 shadow-inner iP:text-[3vh] iP:px-[1.5vw] iP:py-[1.5vw] iP:rounded-[2vw]"
                                }
                                onClick={() => {
                                    setMenu(!menu);
                                }}
                            >
                                <TfiMenuAlt/>
                            </button>
                            <Link href={"https://www.snef.cloud"} className={"absolute left-[4vw] iP:left-[14vw] -top-[1vh] bg-neutral-100 px-[0.25vw] py-[0.25vw] rounded-[0.25vw] hover:bg-neutral-300 shadow-inner iP:text-[3vh] iP:px-[1.5vw] iP:py-[1.5vw] iP:rounded-[2vw]"}><IoIosArrowBack /></Link>
                            <Menu menu={menu} setMenu={setMenu} data={data.schedule} workspaceVisibility={workspaceVisibility} setWorkspaceVisibility={setWorkspaceVisibility} />
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
                                            workspaceVisibility={workspaceVisibility}
                                            setWorkspaceVisibility={setWorkspaceVisibility}
                                        />
                                    );
                                })}
                            </div>

                            <div className={"w-full flex px-[2vw] justify-between items-center text-[0.6vw] iP:text-[1.5vh]"}>
                                <div className={"flex justify-center items-center space-x-[1vw] iP:space-x-[2vh] iP:w-[60vw]"}>
                                    <input type={"checkbox"} className={"cursor-pointer"} onClick={() => {setSignature(!signature)}} />
                                    <p>
                                        Je confirme lexactitude des données ci-dessus et les signe en
                                        cochant cette case.
                                    </p>
                                </div>
                                <button
                                    type={"button"}
                                    onClick={() => {
                                        if (!signature) {
                                            setAlertBox(true)
                                            setTimeout(() => {
                                                setAlertBox(false)
                                            }, 4600)
                                        } else {
                                            console.log(data);
                                            axios.post("https://api.snef.cloud/schedule", {
                                                name: data.name,
                                                schedule: data.schedule
                                            }).then((res) => {
                                                console.log(res.data)
                                                window.location.replace("https://www.snef.cloud");
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                        }
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
                  workspaceVisibility,
                  setWorkspaceVisibility,
              }: {
    data: Data;
    setData: any;
    workspaceVisibility: { [key: string]: boolean };
    setWorkspaceVisibility: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}) => {
    if (!workspaceVisibility[data.name]) {
        return null;
    } else {
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
    }
};

const Section = ({
                     item,
                     setData,
                 }: {
    item: number;
    setData: any;
}) => {
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
