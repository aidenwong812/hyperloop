'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import InputCurrency from "./component/Input";
import { createExchangeTransaction, getEstimatedExchangeAmount, getMinimalExchangeAmount, getTransactionStatus } from "./services/change-now";
import { useGlobalContext } from "../context/GlobalContext";
import Footer from "./component/Footer";

export default function Home() {
  const router = useRouter();
  const [inputAmount, setInputAmount] = useState<any>();
  const [outAmount, setOutAmount] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [inputCurrency, setInputCurrency] = useState<string>("BTC");
  const [outCurrency, setOutCurrency] = useState<string>("ETH");
  const [inputError, setInputError] = useState<string>("");
  const [inputMinimumAmount, setInputminimumAmount] = useState<number>(0.000105);
  const [id, setId] = useState<any>();
  const { setTransactionInfo, setUserId, userId } = useGlobalContext();
  const searchParams = useSearchParams();

  const ApiCurrencyconvertCurrency = (currency: string) => {
    switch (currency) {
      case 'ETH': return "eth";
      case 'Base': return "ethbase";
      case 'BSC': return "ethbsc";
      case 'TRX': return "trx";
      case 'SOL': return "sol";
      case 'MATIC': return "matic";
      case 'SUI': return "sui";
      case 'Pepe': return 'pepe';
      case "MOG": return 'mog';
      default: return "btc";
    }
  };
  const fetchCurrency = async () => {
    const apiOutCurrency = ApiCurrencyconvertCurrency(outCurrency);
    const apiInputCurrency = ApiCurrencyconvertCurrency(inputCurrency);
    const tempInputMinimumAmount = await getMinimalExchangeAmount(apiInputCurrency, apiOutCurrency);
    setInputminimumAmount(tempInputMinimumAmount);
  }

  const fetchAmount = async () => {
    const apiOutCurrency = ApiCurrencyconvertCurrency(outCurrency);
    const apiInputCurrency = ApiCurrencyconvertCurrency(inputCurrency);
    if (inputAmount && inputAmount > inputMinimumAmount) {
      setInputError("");
      const tempOutAmount = await getEstimatedExchangeAmount(apiInputCurrency, apiOutCurrency, inputAmount);
      setOutAmount(tempOutAmount.estimatedAmount);
    } else {
      setInputError(`Send currency amount is very small. Minimum currency amount is ${inputMinimumAmount}`);
    }
  };

  useEffect(() => {
    if (searchParams.get('id') !== undefined) setId(searchParams.get('id'));
  }, [])
  useEffect(() => {
    if (id) {
      setUserId(id);
      axios.post('/api/user', { userId })
        .then((res: any) => { console.log(res); })
        .catch((err: any) => { console.log(err) })
    }
  }, [id])
  // Effect hooks to trigger fetch based on amount or currency change
  useEffect(() => {
    fetchAmount();
  }, [inputAmount]);

  useEffect(() => {
    fetchCurrency();
    fetchAmount();
  }, [inputCurrency, outCurrency]);

  const handleTransaction = async () => {
    try {
      let transaction = await createExchangeTransaction(inputCurrency, outCurrency, inputAmount, address);
      let transactionStatus: any = await getTransactionStatus(transaction.id);

      if (transactionStatus.status === 'error') {
        toast.error(transaction?.message);
      } else {
        toast.success('The transaction has been completed successfully.');
        setTransactionInfo({
          payinAddress: transaction.payinAddress,
          payoutAddress: transaction.payoutAddress,
          fromCurrency: transaction.fromCurrency,
          toCurrency: transaction.toCurrency,
          amount: transaction.amount,
          directedAmount: transaction.directedAmount
        });
        const data = {
          userId: userId,
          transactionId: btoa(transaction.id).replace(/=+$/, ''),
        };
        axios.post("/api/transactions/confirm", { data })
          .then((res: any) => { console.log(res); })
          .catch((err: any) => { console.log(err) })
        router.push("/confirm");
      }

    } catch (error: any) {
      toast.error(error.response);
    }
  };

  return (
    <div className="w-full text-white flex flex-col justify-center items-center -mt-20 sm:px-[70px] gap-8 p-4">
      <article className="text-2xl">Exchange Crypto</article>
      <div className="w-full">
        <InputCurrency
          style="Send"
          setCurrency={setInputAmount}
          currency={inputAmount}
          tokenStyle={inputCurrency}
          setTokenStyle={setInputCurrency}
        />
        <div className={`bg-[#ffffff] text-red-500 text-[14px] -mt-2 ${inputError ? "px-2" : "p-0"} rounded-b-md`}>
          {inputError}
        </div>
      </div>
      <div className="w-full">
        <InputCurrency
          style="Get"
          setCurrency={setOutAmount}
          currency={outAmount}
          tokenStyle={outCurrency}
          setTokenStyle={setOutCurrency}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <article>Recipient Wallet</article>
        <input
          className="w-full rounded-md outline-none bg-transparent border-[1px] border-[#dde2ea] p-2"
          placeholder="Enter the ETH payout address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        className="w-full rounded-full border-[1px] border-[#dde2ea] py-2 bg-radial-gradient from-transparent to-[#9c5ef8] hover:-translate-y-1 duration-300"
        onClick={handleTransaction}
      >
        Confirm
      </button>
      <Footer />
    </div>
  );
}
