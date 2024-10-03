'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../component/Footer";
import { useGlobalContext } from "@/context/GlobalContext";

const Status = () => {
    const { userId } = useGlobalContext();
    const [transactions, setTransactions] = useState([{transactionId:'', status:'', createdAt: 11}]);
    useEffect(() => {
        axios.post("/api/transactions/status", { userId })
            .then((res) => {
                const datas = res.data.data;
                setTransactions(datas);
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="text-white text-2xl -mt-20 font-bold">
                Check the transaction status.
            </div>
            <table className="text-white border-[0.5px]">
                <thead>
                    <th className="border-r-[0.5px]">No</th>
                    <th className="border-r-[0.5px]">TransactionId</th>
                    <th>Status</th>
                </thead>
                <tbody className="text-center">
                {
                    transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="border-r-[0.5px] border-t-[0.5px]">{index + 1}</td>
                            <td className="border-r-[0.5px] border-t-[0.5px]">{transaction.transactionId}</td>
                            <td className="border-t-[0.5px]">{transaction.status}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Footer />
        </div>
    )
}
export default Status;