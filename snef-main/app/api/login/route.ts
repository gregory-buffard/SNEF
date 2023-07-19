/*import nextConnect, {createRouter} from 'next-connect';
import { verifyPassword, createToken } from '@/app/utils/auth';
import { setCookie } from '@/app/utils/cookies';
import dbConnect from '@/lib/db';
import User from '@/models/userModel';

const router = createRouter();

export default router.use(dbConnect).post(async (req:any, res:any) => {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const isPasswordValid = await verifyPassword(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }
        const token = createToken(user);
        setCookie(res, 'token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60,
        });

        return res.status(200).json({ user: { username: user.username, role: user.role } });
    });*/

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword, createToken } from '@/app/utils/auth';
import { setCookie } from '@/app/utils/cookies';
import User from '@/models/userModel';
import dbConnect from '@/lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;
    const user = await dbConnect.User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = createToken(user);
    setCookie(res, 'token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, // expires in 7 days
    });
    return res.status(200).json({
        user: {
            username: user.username,
            role: user.role,
        },
    });
};
