import React, {FC} from "react";
import {TfiMenuAlt} from "react-icons/tfi";
import {shippingProps} from "./Nav";
import {BsDatabaseFillAdd} from "react-icons/bs";
import {HiUserGroup} from "react-icons/hi";
import Link from "next/link";
import {IoIosArrowBack} from "react-icons/io";

export const ListWorkspace:FC<shippingProps> = ({shippingProps}) => {
    const {menu, setMenu, addWorkspaceDialog, setAddWorkspaceDialog, selectUserDialog, setSelectUserDialog} = shippingProps;

    return (
        <div className={'navApp'}>
            <button
                type={"button"}
                className={"navButton shadow-inner peer"}
                onClick={() => {
                    setMenu(!menu);
                    switch (true) {
                        case addWorkspaceDialog:
                            setAddWorkspaceDialog(false);
                        case selectUserDialog:
                            setSelectUserDialog(false);
                            break;
                    }
                }}
            >
                <TfiMenuAlt/>
            </button>
            <p className={'contextTag iP:hidden peer-hover:opacity-100 text-tag'}>Liste de chantiers</p>
        </div>
    );
}

export const AddWorkspace:FC<shippingProps> = ({shippingProps}) => {
    const {menu, setMenu, addWorkspaceDialog, setAddWorkspaceDialog, selectUserDialog, setSelectUserDialog} = shippingProps;

    return (
        <div className={'navApp'}>
            <button
                type={"button"}
                className={
                    "navButton shadow-inner peer"
                }
                onClick={() => {
                    setAddWorkspaceDialog(!addWorkspaceDialog);
                    switch (true) {
                        case selectUserDialog:
                            setSelectUserDialog(false);
                        case menu:
                            setMenu(false);
                            break;
                    }
                }}
            >
                <BsDatabaseFillAdd />
            </button>
            <p className={'contextTag iP:hidden peer-hover:opacity-100 text-tag'}>Ajouter un chantier</p>
        </div>
    )
}

export const UserList:FC<shippingProps> = ({shippingProps}) => {
    const {menu, setMenu, addWorkspaceDialog, setAddWorkspaceDialog, selectUserDialog, setSelectUserDialog} = shippingProps;

    return (
        <div className={'navApp'}>
            <button type={'button'} onClick={() => {
                setSelectUserDialog(!selectUserDialog);
                switch (true) {
                    case addWorkspaceDialog:
                        setAddWorkspaceDialog(false);
                    case menu:
                        setMenu(false);
                        break;
                }
            }} className={"navButton shadow-inner peer"}>
                <HiUserGroup />
            </button>
            <p className={'contextTag iP:hidden peer-hover:opacity-100 text-tag'}>Liste d&apos;intérimaires</p>
        </div>
    )
}

export const BackToLandingPage = () => {
    return (
        <div className={'navApp'}>
            <Link href={"https://www.snef.cloud"} className={"navButton shadow-inner peer"}>
                <IoIosArrowBack />
            </Link>
            <p className={'contextTag iP:hidden peer-hover:opacity-100 text-tag'}>Page d&apos;acceuil</p>
        </div>
    )
};