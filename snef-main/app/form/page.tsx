"use client";

import {useEffect, useState} from "react";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import {LuClipboardEdit} from "react-icons/lu";
import {TfiMenuAlt} from "react-icons/tfi";
import Cookies from "js-cookie";
import axios from "axios";


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

        const [menu, setMenu] = useState("translate-x-[-10vw]");


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
                className="w-1/2 h-screen m-auto flex flex-col justify-center items-center not-italic space-y-[3vh] select-none">
                {loading ?
                    <div className={"w-screen h-screen flex justify-center items-center"}><p>Chargement...</p></div> : (
                        <>
                            <button
                                type={"button"}
                                className={
                                    "absolute left-[2vw] top-[2vh] bg-neutral-100 px-[0.25vw] py-[0.25vw] rounded-[0.25vw] hover:bg-neutral-300 shadow-inner"
                                }
                                onClick={() => {
                                    if (menu == "translate-x-[-10vw]") {
                                        setMenu("translate-x-[2vw]");
                                    } else {
                                        setMenu("translate-x-[-10vw]");
                                    }
                                }}
                            >
                                <TfiMenuAlt/>
                            </button>
                            <div
                                className={
                                    "absolute bg-neutral-100 px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg top-[3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start " +
                                    menu
                                }
                            >
                                <div className={"flex justify-start items-center space-x-3"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Parking Public</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-3"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Parking Privée</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-3"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Maladie</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-3"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Ferié</p>
                                </div>
                                <div className={"flex justify-start items-center space-x-3"}>
                                    <input type={"checkbox"} className={"cursor-pointer"}/>
                                    <p>Congés</p>
                                </div>
                            </div>
                            <div className={"flex flex-col justify-center items-center space-y-2"}>
                                <h1 className={"text-[1.5vw] text-neutral-800"}>
                                    Formulaire de pointage de {data.name}
                                </h1>
                                <h3
                                    className={
                                        "border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw] text-[0.6vw]"
                                    }
                                >
                                    {weekAgo} – {currentDate}
                                </h3>
                            </div>

                            <div
                                className={
                                    "flex text-[0.6vw] space-x-[1vw] bg-neutral-100 rounded-[1vw] px-[2vw] py-[2vh] drop-shadow-2xl"
                                }
                            >
                                <WeekCol/>
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

                            <div className={"w-full flex px-[2vw] justify-between items-center text-[0.6vw]"}>
                                <div className={"flex justify-center items-center space-x-2"}>
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
                                        "flex justify-center items-center space-x-2 bg-neutral-100 px-[1vw] py-[1vh] rounded-[0.5vw] hover:bg-blue-300 transition duration-200 ease-in-out shadow-inner border-b-2 border-neutral-50"
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
                className={`bg-neutral-50 rounded-[0.5vw] drop-shadow-lg w-[9vw] h-[4vh] flex justify-center items-center`}
            >
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
                <p className={"px-[1vw] py-[1vh] bg-neutral-50 shadow-inner rounded-l-[0.5vw]"}>
                    {item}h
                </p>
                <div
                    className={"flex flex-col justify-center items-center drop-shadow-lg"}
                >
                    <button
                        type={"button"}
                        className={
                            "bg-neutral-50 rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
                        }
                        onClick={() => {
                            setData(item + 1);
                        }}
                    >
                        <IoIosArrowUp className={"text-[1vw] mx-[0.5vw] h-[2.5vh]"}/>
                    </button>
                    <button
                        type={"button"}
                        className={
                            "bg-neutral-50 rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"
                        }
                        onClick={() => {
                            if (item > 0) setData(item - 1);
                        }}
                    >
                        <IoIosArrowDown className={"text-[1vw] mx-[0.5vw] h-[2.5vh]"}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
