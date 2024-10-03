
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "../context/GlobalContext";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#6f39eb] justify-center items-center">
      <body className={inter.className}>
        <GlobalProvider>
          <ToastContainer />
          <div className=" bg-[#6f39eb] w-full flex flex-col justify-center h-screen items-center relative">
            <div className={inter.className}>{children}</div>
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
