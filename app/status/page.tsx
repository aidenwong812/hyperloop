import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../component/Footer";
import { useGlobalContext } from "@/context/GlobalContext";

const Status = () => {
    const { userId } = useGlobalContext();
    const [transactions, setTransactions]: any = useState();
    useEffect(() => {
        axios.post("/api/transactions/status", userId)
            .then(async (res) => {
                const datas = await res.data;
                datas.map((data: any) => {
                    setTransactions([...transactions, data]);
                })
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div >
            <div className="text-white text-2xl -mt-20 font-bold">
                Check the transaction status.
            </div>
            <table>
                <thead>
                    <th>Address</th>
                    <th>Send Currency</th>
                    <th>Send Amount</th>
                    <th>Get Currency</th>
                    <th>Get Amount</th>
                    <th>Time</th>
                </thead>
                <tbody>
                    {transactions.map((transaction: any) => {
                        <>
                            <td>{transaction.payoutAddress}</td>
                            <td>{transaction.fromCurrency}</td>
                            <td>{transaction.directedAmount}</td>
                            <td>{transaction.toCurrency}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.timestamp}</td>
                        </>
                    })}
                </tbody>
            </table>
            <Footer />
        </div>
    )
}
export default Status;