import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            });

            session.user.id = sessionUser._id.toString();
            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDB();

                // check if a user is already exist
                const userExist = await User.findOne({
                    email: profile.email,
                });

                // If not then create new user and save it to the database. For that we need model; refer to: models/user.js
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        // username: profile.name.replace(" ", "").toLowerCase(),
                        username: profile.email.split("@")[0].toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                // If any error
                console.log(error);
                return false;
            }
        },
    },
    // debug: true,
});

export { handler as GET, handler as POST };
