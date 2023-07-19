'use client';

import {useSession, signOut} from "next-auth/react";
import Link from "next/link";

export default function AuthProfileMenu() {
    const {data, status} = useSession();
    const isAuth = status === 'authenticated';

    if (isAuth)
        return (
            <button onClick={() => signOut()}>logout</button>
        );

    return (
        <Link href={'./auth/sign-in'}>Login</Link>
    )
}