import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../component/Authprovider/Authprovider";
import  LogInOut  from "../component/logInOut";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="bg-gray-200  h-full w-full">
     
        <body className="h-full ">
          <div className=""> 
        <div className=" w-full fixed p-2 bg-gray-300 z-10">
        <div className="flex justify-between ">
        <div className="text-3xl flex  ">Freedom of speech  </div>
        <LogInOut/>
        </div>
        </div>
        </div>
       <AuthProvider>
          <div className="z-10 ">
           {children}
           </div>
        </AuthProvider>
       
       
        </body>
        
    </html>
  );
}
