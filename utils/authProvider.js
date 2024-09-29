import dbConnected from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET_KEY } from "./constant";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET_KEY,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // invoke on successful sign in
    async signIn({ profile }) {
      console.log(profile);

      // 1. connect to the database
      await dbConnected();

      // 2. check user is already or not
      const user = await User.findOne({ email: profile.email });

      // 3. if not, create new user
      if (!user) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign up
      return true;
    },

    // modify the session
    async session({ session }) {
      console.log(session);

      // 1. get user id from the database
      const user = await User.findOne({ email: session.user.email });
      // 2. assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
