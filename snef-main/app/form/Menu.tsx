"use client";

import {CgClose} from "react-icons/cg";
import {Data} from "./page";

const Menu = ({menu, setMenu, data}:{menu:boolean, setMenu:any, data:Data[]}) => {
    return (
        <div
            className={
                `absolute bg-neutral-100 iP:bg-snef iP:backdrop-blur-md px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg iP:drop-shadow-none top-[3vh] iP:top-[-3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 ${menu ? "translate-x-[2vw] iP:translate-x-0" : "translate-x-[-100vw] iP:translate-x-[-100vw]"}`
            }
        >
            <button type={"button"} onClick={() => {
                setMenu(!menu);
            }} className={"hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"}><CgClose /></button>
            {data.map((d, i) => {
                return (
                    <NavSelector data={d} key={i} />
                )
            })}
        </div>
    )
};

const NavSelector = ({data}:{data:{name:string, days:any}}) => {
    return (
        <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
            <input type={"checkbox"} className={"cursor-pointer"} />
            <p>{data.name}</p>
        </div>
    )
};

export default Menu;