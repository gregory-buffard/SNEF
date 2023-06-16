"use client";

import {supabase} from "../supabase";
import {useState} from "react";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import {LuClipboardEdit} from "react-icons/lu";

const Page = () => {
    const handleSubmit = (e:any) => {};

    /*const getWorkspaces = async () => {
        const {data, error} = await supabase.from("pg_tables").select("tablename").neq("tablename", "staffID");
        if (error) console.log(error);
        else console.log(data);
        return data;
    }
    const data = getWorkspaces() as any;*/
    /*const [data, setData] = useState("");*/
    /*for(let i = 0; i < 0; i++) {
        break
    }*/
    /*setData("<p>Parking Public</p><p>Parking Privée</p><p>Maladie</p><p>Ferié</p><p>Congés</p>")*/

    const data = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    const [dataSet, setDataSet] = useState(data);

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
        <main className="w-2/3 h-screen m-auto flex flex-col justify-center items-center not-italic space-y-6 select-none">
            <div className={"flex flex-col justify-center items-center space-y-2"}>
                <h1 className={"text-4xl text-neutral-800"}>Formulaire de pointage de Testing Subject</h1>
                <h3 className={"border-2 border-neutral-300 px-[0.25vw] py-[0.25vh] rounded-[0.5vw]"}>{weekAgo} – {currentDate}</h3>
            </div>
            <form className={"flex flex-col justify-start items-end text-base w-max space-y-3 bg-neutral-100 rounded-[1vw] px-[2vw] py-[2vh] drop-shadow-2xl"}>
                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <p className={"w-[9vw] py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg"}>Parking Public</p> <p className={"w-[9vw] py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg"}>Parking Privée</p><p  className={"w-[9vw] py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg"}>Maladie</p><p  className={"w-[9vw] py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg"}>Ferié</p><p className={"w-[9vw] py-[1vh] bg-neutral-50 rounded-[0.5vw] drop-shadow-lg"}>Congés</p></div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Lundi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[0][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[0][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[0][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[0][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[0][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[0][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[0][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[0][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[0][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}onClick={() => {
                                    const newData = [...dataSet];
                                    newData[0][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[0][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[0][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[0][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[0][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[0][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[0][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[0][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[0][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[0][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[0][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Mardi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[1][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[1][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[1][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[1][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[1][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[1][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[1][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[1][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[1][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[1][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[1][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[1][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[1][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[1][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[1][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[1][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[1][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[1][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[1][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[1][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Mercredi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[2][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[2][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[2][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[2][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[2][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[2][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[2][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[2][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[2][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[2][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[2][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[2][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[2][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[2][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[2][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[2][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[2][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[2][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[2][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[2][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Jeudi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[3][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[3][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[3][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[3][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[3][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[3][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[3][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[3][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[3][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[3][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[3][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[3][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[3][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[3][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[3][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[3][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[3][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[3][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[3][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[3][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Vendredi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[4][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[4][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[4][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[4][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[4][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[4][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[4][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[4][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[4][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[4][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[4][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[4][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[4][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[4][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[4][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[4][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[4][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[4][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[4][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[4][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-left"}>Samedi</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[5][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[5][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[5][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[5][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[5][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[5][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[5][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[5][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[5][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[5][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[5][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[5][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[5][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[5][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[5][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[5][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[5][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[5][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[5][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[5][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"w-max px-[1vw] py-[1vh] text-right"}>Dimanche</div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[6][0]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[6][0] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[6][0] > 0) {
                                        const newData = [...dataSet];
                                        newData[6][0] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[6][1]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[6][1] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[6][1] > 0) {
                                        const newData = [...dataSet];
                                        newData[6][1] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[6][2]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[6][2] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[6][2] > 0) {
                                        const newData = [...dataSet];
                                        newData[6][2] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[6][3]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[6][3] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[6][3] > 0) {
                                        const newData = [...dataSet];
                                        newData[6][3] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>{dataSet[6][4]}h</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    const newData = [...dataSet];
                                    newData[6][4] += 1;
                                    setDataSet(newData);
                                    console.log(dataSet);
                                }} >
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"} onClick={() => {
                                    if (dataSet[6][4] > 0) {
                                        const newData = [...dataSet];
                                        newData[6][4] -= 1;
                                        setDataSet(newData);
                                    }
                                }} >
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className={"w-full flex px-[2vw] justify-between items-center"}>
                <div className={"flex justify-center items-center space-x-2"}><input type={"checkbox"} className={"cursor-pointer"} required /><p>Je confirme l'exactitude des données ci-dessus et les signe en cochant cette case.</p></div>
                <button type={"submit"} className={"flex justify-center items-center space-x-2 bg-neutral-100 px-[1vw] py-[1vh] rounded-[0.5vw] hover:bg-blue-300 transition duration-200 ease-in-out shadow-inner border-b-2 border-neutral-50"}><p>Soumettre</p><LuClipboardEdit /></button>
            </div>
        </main>
    );
};

export default Page;