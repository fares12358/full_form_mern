import { Yuji_Mai } from "next/font/google";
import "./globals.css";

import AuthProvider from "./AuthProvider.js";

import { AppProvider } from "./Context.js";
import Nav from "./Components/Nav";

const yujiMai = Yuji_Mai({ subsets: ['latin'], weight: ['400'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${yujiMai.className} antialiased w-screen overflow-hidden`}
      >
        <AuthProvider>
          <AppProvider>
            <Nav />
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
