import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const token = 'f9b8c1d45e3a4f6789b12c34d5e67f890a1b23c45d6e78f90b12c34d5e67f890'


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await axios.post(`${API_URL}/google-login`, {
          name: user.name,
          email: user.email,
          image: user.image,
        },
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          });
        if (response.status !== 200) {
          console.error("Failed to save user data to backend:", response.data);
          return false; // Block login if backend fails
        }
        return true; // Allow sign-in
      } catch (error) {
        console.error("Error storing user:", error.response?.data || error.message);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
console.log("NextAuth API route is running!");
