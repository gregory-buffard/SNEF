import React from "react";
import '../global.css';
import {ListWorkspace, AddWorkspace, UserList, BackToLandingPage} from "./Buttons";

type navProps = {
    adminState: boolean,
    menu: boolean,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>,
    addWorkspaceDialog: boolean,
    setAddWorkspaceDialog: React.Dispatch<React.SetStateAction<boolean>>,
    selectUserDialog: boolean,
    setSelectUserDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

export type shippingProps = {
    shippingProps: navProps
}

const Divider = () => {
    return (
        <div className={'w-[0.15vw] h-[2vw] iP:w-[0.25vh] iP:h-[3vh] bg-neutral-200 rounded-full'}></div>
    )
}

const Nav:React.FC<navProps> = ({adminState, menu, setMenu, addWorkspaceDialog, setAddWorkspaceDialog, selectUserDialog, setSelectUserDialog}) => {

    const shippingProps:navProps = {
        menu,
        setMenu,
        addWorkspaceDialog,
        setAddWorkspaceDialog,
        selectUserDialog,
        setSelectUserDialog,
        adminState
    }

    return (
        <div className={'flex justify-center items-center space-x-[1vw] iP:space-x-[3vh] absolute top-[2vw] bg-neutral-100 px-[0.5vw] iP:px-[1.5vh] py-[0.5vw] iP:py-[1vh] drop-shadow-2xl rounded-[1vw] iP:rounded-[1.5vh]'}>

            <ListWorkspace shippingProps={shippingProps}  />
            {adminState && (
                <>
                    <AddWorkspace shippingProps={shippingProps} />
                    <UserList shippingProps={shippingProps} />
                </>
            )}

            <Divider />

            <BackToLandingPage />

        </div>
    )
}

export default Nav;