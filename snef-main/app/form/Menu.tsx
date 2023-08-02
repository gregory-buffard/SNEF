"use client";

import {CgClose} from "react-icons/cg";
import {Data} from "./page";

interface MenuProps {
    menu: boolean;
    setMenu: any;
    data: Data[];
    workspaceVisibility: {[key: string]: boolean};
    setWorkspaceVisibility: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
}

const Menu: React.FC<MenuProps> = ({menu, setMenu, data, workspaceVisibility, setWorkspaceVisibility}) => {
    return (
        <div
            className={
                `z-10 absolute scrollbarStyle bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-b-[0.75vw] iP:drop-shadow-none transition duration-200 ease-in-out flex flex-col justify-start items-center iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 overflow-y-scroll left-[2vw] drop-shadow-2xl top-[-3vh] iP:left-[-3vh] ${menu ? "translate-y-[0] iP:translate-x-0" : "translate-y-[-100vh] iP:translate-y-0 iP:translate-x-[-100vw]"}`
            }
        >
            <button type={"button"} onClick={() => {
                setMenu(!menu);
            }} className={"hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-200 shadow-inner hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"}><CgClose /></button>
            {data.map((d, i) => {
                return (
                    <NavSelector name={d.name} key={i} workspaceVisibility={workspaceVisibility} setWorkspaceVisibility={setWorkspaceVisibility} />
                )
            })}
        </div>
    )
};

interface NavSelectorProps {
    name: string;
    workspaceVisibility: {[key: string]: boolean};
    setWorkspaceVisibility: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
}

const NavSelector:React.FC<NavSelectorProps> = ({name, workspaceVisibility, setWorkspaceVisibility}) => {
    const isChecked = workspaceVisibility[name];
    const toggleCheckbox = () => {
        setWorkspaceVisibility(prevState => {
            return {
                ...prevState,
                [name]: !isChecked
            }
        })
    };
    return (
        <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh] bg-neutral-300 rounded-[0.5vw] w-full iP:w-max iP:bg-transparent px-[0.75vw] py-[0.5vh] my-[0.5vh]"}>
            <input type={"checkbox"} checked={isChecked} onChange={toggleCheckbox} className={"cursor-pointer iP:w-[3vh] iP:h-[3vh] accent-snef"} />
            <p>{name}</p>
        </div>
    )
};

export default Menu;