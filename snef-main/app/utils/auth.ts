import jwt from 'jsonwebtoken';

export function createToken(user:any) {
    return jwt.sign({id: user.id, role: user.role}, process.env.NEXTAUTH_SECRET as string, {expiresIn: '7d'});
}

export function verifyPassword(token:string) {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
}