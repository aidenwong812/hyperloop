import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#565458] justify-center items-center">
      <body className={inter.className}>
        <div className=" bg-[#6f39eb] w-full flex flex-col">
          <div className={inter.className}>{children}</div>          
        </div>
      </body>
    </html>
  );
}
