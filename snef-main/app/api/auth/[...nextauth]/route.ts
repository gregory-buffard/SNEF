/*import startDB from '@/lib/db';
import UserModel from "@/models/userModel";
import NextAuth from 'next-auth'
import CredentialProviders from 'next-auth/providers'
import { connectToDatabase } from '../../../utils/db'

export default NextAuth({
    providers: [
        CredentialProviders({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const { db } = await connectToDatabase()
                const user = await db.collection('users').findOne({ username: credentials.username })

                if (user && user.password === credentials.password) {
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }
            }
        })
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user._id
                token.role = user.role
            }
            return token
        },
        async session(session, token) {
            session.userId = token.id
            session.role = token.role
            return session
        },
    },
})*/


/*export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any, req:any) {
                const {username, password} = credentials as {
                    username: string;
                    password: string;
                };
                await startDB();
                const user = await UserModel.findOne({username: username});
                if (!user) throw new Error("Erreur d'utilisateur");
                const passwordMatch = await user.comparePassword(password);
                console.log('HERE PASSWORD MATCH ===> ',passwordMatch)
                if (!passwordMatch) throw new Error("Erreur de mot de passe");
                return {
                    username: user.username,
                    role: user.role,
                    id: user._id,
                }
            }
        })
    ],
    callbacks: {
        jwt(params: any) {
            if (params.user?.role) {
                params.token.role = params.user.role;
                params.token.id = params.user.id;
            }
            return params.token;
        },
        session({session, token}) {
            if (session.user) {
                (session.user as {id:string}).id = token.id as string;
                (session.user as {role:string}).role = token.role as string;
            }
            return session;
        },
    },
};*/

/*const authHandler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
});*/

const authHandler = NextAuth(authOptions)

export {authHandler as GET, authHandler as POST};