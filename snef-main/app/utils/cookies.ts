import cookie from 'cookie';

export function setCookie(res:any, name:any, value:any, options = {}) {
    res.setHeader('Set-Cookie', cookie.serialize(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        ...options
    }));
}

export function removeCookie(res:any, name:any) {
    res.setHeader('Set-Cookie', cookie.serialize(name, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0)
    }));
}
