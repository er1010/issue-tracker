import NextAuth from "next-auth";
import authOptions from "./autoOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
