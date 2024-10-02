import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#6f39eb] justify-center items-center">
      <body className={inter.className}>
        <ToastContainer className=" text-[10px]"/>
        <div className=" bg-[#6f39eb] w-full flex flex-col justify-center h-screen items-center">
          <div className={inter.className}>{children}</div>          
        </div>
      </body>
    </html>
  );
}
