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
                `absolute bg-neutral-100 iP:bg-snef iP:backdrop-blur-xl px-[1vw] py-[1vh] rounded-[0.5vw] drop-shadow-lg iP:drop-shadow-none top-[3vh] iP:top-[-3vh] transition duration-200 ease-in-out left-0 flex flex-col justify-start items-start iP:w-[90vw] iP:h-screen iP:z-10 iP:rounded-r-[2vh] iP:justify-center iP:items-baseline iP:space-y-[2vh] iP:pl-[25%] iP:text-[2vh] iP:text-neutral-100 iP:border-y-[0.25vh] iP:border-r-[0.25vh] iP:border-teal-700 iP:border-opacity-25 ${menu ? "translate-x-[2vw] iP:translate-x-0" : "translate-x-[-100vw] iP:translate-x-[-100vw]"}`
            }
        >
            <button type={"button"} onClick={() => {
                setMenu(!menu);
            }} className={"hidden iP:block absolute right-[3vw] top-[3vw] text-[3vh] px-[1vw] py-[1vw] text-center hover:text-neutral-300 hover:bg-neutral-900 hover:bg-opacity-50 rounded-full transition-all duration-200 ease-in-out"}><CgClose /></button>
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
        <div className={"flex justify-start items-center space-x-[1vw] iP:space-x-[2vh]"}>
            <input type={"checkbox"} checked={isChecked} onChange={toggleCheckbox} className={"cursor-pointer"} />
            <p>{name}</p>
        </div>
    )
};

export default Menu;