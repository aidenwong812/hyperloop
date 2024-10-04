'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { SlRefresh } from "react-icons/sl";
import Footer from "../component/Footer";
import { useGlobalContext } from "@/context/GlobalContext";

const Status = () => {
    const { userId } = useGlobalContext();
    const [transactions, setTransactions] = useState([{ transactionId: '', status: '', createdAt: 11 }]);
    const [isLoading, setIsloading] = useState(false);
    const handleStatus = () => {
        axios.post("/api/transactions/status", { userId })
            .then((res) => {
                const datas = res.data.data;
                setTransactions(datas);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        handleStatus();
    }, [])
    const handleReset = () => {
        setIsloading(true);
        axios.post("/api/transactions/reset", { transactions })
            .then((res) => {
                setIsloading(false);
                console.log(res.data);
                handleStatus();
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="text-white text-2xl -mt-20 font-bold">
                Check the transaction status.
            </div>
            <div>
                <button className="py-1 px-2 rounded-md hover:bg-[#35177a] touch-pan-left bg-[#4e23b4] text-white text-sm float-end w-20 outline-none"
                    onClick={handleReset}
                    disabled={isLoading}
                >
                    <div className="flex gap-2 justify-center items-center">
                        <SlRefresh className={`${isLoading ? "animate-spin" : " animate-none"} `} />
                        Reset
                    </div>
                </button>
            </div>
            <div className=" h-[350px] overflow-auto w-full">
                <table className="text-white border-[0.5px] w-full">
                    <thead className=" sticky top-[-0.5px] bg-[#6f39eb]">
                        <tr className="border-[0.5px]">
                            <th className="border-r-[0.5px]">No</th>
                            <th className="border-r-[0.5px]">TransactionId</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-center  w-full">
                        {
                            transactions.map((transaction, index) => (
                                <tr key={index} className="h-8">
                                    <td className="border-r-[0.5px] border-t-[0.5px]">{index + 1}</td>
                                    <td className="border-r-[0.5px] border-t-[0.5px]">{transaction.transactionId}</td>
                                    <td className="border-t-[0.5px]">{transaction.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}
export default Status;