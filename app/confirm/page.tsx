'use client'
import { useGlobalContext } from "../../context/GlobalContext";
import Footer from "../component/Footer";

const Confirm = () => {
    const { transactionInfo } = useGlobalContext();
    return (
        <>
            <div className="flex flex-col gap-2 text-white text-md px-6 -mt-28">
                <p className="text-2xl text-center py-4 text-[#ffffff]">Please send the funds you would like to exchange</p>
                <div className="flex gap-4">Amount
                    <p className="font-extrabold">{transactionInfo.directedAmount} {transactionInfo.fromCurrency}</p>
                </div>
                <p>To this address : </p>
                <p className="text-green-300 font-extrabold break-all">  {transactionInfo.payinAddress}</p>
                <div className="flex gap-4">You Get
                    <p className="font-extrabold">{transactionInfo.amount} {transactionInfo.toCurrency}</p>
                </div>
                <p>Recipitent Wallet:</p>
                <p className="break-all text-green-300 font-extrabold"> {transactionInfo.payoutAddress}</p>
            </div>
            <Footer />
        </>
    )
}
export default Confirm;