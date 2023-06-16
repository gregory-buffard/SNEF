"use client";

import {supabase} from "../supabase";
import {useState} from "react";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";

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
    return (
        <main className="w-2/3 h-screen m-auto bg-red-400 flex flex-col justify-center items-center not-italic">
            <h1 className={"text-4xl text-neutral-800"}>Formulaire de pointage de name</h1>
            <form className={"flex flex-col justify-start items-end text-base w-full space-y-3"}>
                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <p className={"bg-blue-400 w-[9vw] py-[1vh]"}>Parking Public</p> <p className={"bg-blue-400 w-[9vw] py-[1vh]"}>Parking Privée</p><p  className={"bg-blue-400 w-[9vw] py-[1vh]"}>Maladie</p><p  className={"bg-blue-400 w-[9vw] py-[1vh]"}>Ferié</p><p className={"bg-blue-400 w-[9vw] py-[1vh]"}>Congés</p></div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Lundi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Mardi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Mercredi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Jeudi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Vendredi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Samedi</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex justify-end items-baseline space-x-3 w-full text-center"}>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh] text-left"}>Dimanche</div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-400 w-[9vw] py-[1vh]"}>
                        <div className={"flex justify-center items-center"}>
                            <p className={"px-[1vw] py-[1vh] bg-white rounded-l-[0.5vw]"}>12</p>
                            <div className={"flex flex-col justify-center items-center drop-shadow-lg"}>
                                <button type={"button"} className={"bg-white rounded-t-[0.5vw] border-b-[0.05vw] border-b-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowUp className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                                <button type={"button"} className={"bg-white rounded-b-[0.5vw] border-t-[0.05vw] border-t-neutral-300 hover:bg-neutral-300 transition duration-200 ease-in-out"}>
                                    <IoIosArrowDown className={"text-2xl mx-[0.5vw] my-[0.5vh]"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default Page;