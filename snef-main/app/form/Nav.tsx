import React from "react";
import '../global.css';
import {ListWorkspace, AddWorkspace, UserList, BackToLandingPage} from "./Buttons";
import {BsArrowUpShort} from "react-icons/bs";

type navProps = {
    adminState: any,
    menu: boolean,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>,
    addWorkspaceDialog: boolean,
    setAddWorkspaceDialog: React.Dispatch<React.SetStateAction<boolean>>,
    selectUserDialog: boolean,
    setSelectUserDialog: React.Dispatch<React.SetStateAction<boolean>>,
    groupWorkers: any,
    selGroupWorker: any,
    selWorkerDialog: boolean
}

export type shippingProps = {
    shippingProps: navProps
}

const Divider = () => {
    return (
        <div className={'w-[0.15vw] h-[2vw] iP:w-[0.25vh] iP:h-[3vh] bg-neutral-200 rounded-full'}></div>
    )
}

const Nav:React.FC<navProps> = ({adminState, menu, setMenu, addWorkspaceDialog, setAddWorkspaceDialog, selectUserDialog, setSelectUserDialog, groupWorkers, selGroupWorker, selWorkerDialog}) => {

    const shippingProps:navProps = {
        menu,
        setMenu,
        addWorkspaceDialog,
        setAddWorkspaceDialog,
        selectUserDialog,
        setSelectUserDialog,
        adminState,
        groupWorkers,
        selGroupWorker,
        selWorkerDialog
    }

    return (
        <div className={'flex justify-center items-center space-x-[1vw] iP:space-x-[3vh] absolute top-[2vw] bg-neutral-100 px-[0.5vw] iP:px-[1.5vh] py-[0.5vw] iP:py-[1vh] drop-shadow-2xl rounded-[1vw] iP:rounded-[1.5vh]'}>

            <ListWorkspace shippingProps={shippingProps}  />
            {adminState && (
                <>
                    <AddWorkspace shippingProps={shippingProps} />
                    {groupWorkers.length > 0 && (
                        <>
                            <UserList shippingProps={shippingProps} />
                        </>
                    )}
                </>
            )}

            <Divider />

            <BackToLandingPage />

            {!selGroupWorker && (
                <BsArrowUpShort
                    className={`absolute text-[4vw] text-snef iP:text-[8vh] iP:translate-x-[0.5vw] iP:translate-y-[6vh] translate-y-[5vh] translate-x-[0.75vw] animate-pulse transition-opacity duration-200 ease-in-out -z-20 ${
                        selWorkerDialog ? "opacity-0" : "opacity-100"
                    }`}
                />
            )}

        </div>
    )
}

export default Nav;