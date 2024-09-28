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
        // 1. connect to the database
        // 2. check user is already or not
        // 3. if not, create new user
        // 4. return true to allow sign up 
    },

    // modify the session 
    async session({session}){
        // 1. get user id from the database
        // 2. assign the user id to the session
        // 3. return session
    }
  },
};

