"use client"
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return(
    <div className="h-full">
   <SessionProvider>
    {children}
    </SessionProvider>;
    </div>)
};

export default AuthProvider;
