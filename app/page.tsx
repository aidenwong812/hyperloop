'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputCurrency from "./component/Input";
import { createExchangeTransaction, getEstimatedExchangeAmount, getMinimalExchangeAmount, getTransactionStatus } from "./services/change-now";

export default function Home() {
  const [inputAmount, setInputAmount] = useState<any>();
  const [outAmount, setOutAmount] = useState<any>();
  const [address, setAddress] = useState<string>("");
  const [inputCurrency, setInputCurrency] = useState<string>("BTC");
  const [outCurrency, setOutCurrency] = useState<string>("ETH");
  const [inputError, setInputError] = useState<string>("");
  const [inputMinimumAmount, setInputminimumAmount] = useState<number>(0.000105);
  // Helper function to convert currency
  const ApiCurrencyconvertCurrency = (currency: string) => {
    switch (currency) {
      case 'ETH': return "eth";
      case 'Base': return "ethbase";
      case 'BSC': return "ethbsc";
      case 'TRX': return "trx";
      case 'SOL': return "sol";
      case 'Matic': return "matic";
      case 'Sui': return "sui";
      default: return "btc";
    }
  };
  const fetchCurrency = async () =>{    
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

  // Effect hooks to trigger fetch based on amount or currency change
  useEffect(() => {
      fetchAmount();
  }, [inputAmount]);

  useEffect(() => {
    fetchCurrency();
    fetchAmount();
  }, [outCurrency]);

  useEffect(() => {
    fetchCurrency();
    fetchAmount();
  }, [inputCurrency]);

  const handleTransaction = async () => {
    try {
      let transaction = await createExchangeTransaction(inputCurrency, outCurrency, inputAmount, address);
      let transactionStatus :any = await getTransactionStatus(transaction.id);

      if (transactionStatus.status === 'error') {
        console.log(transactionStatus)
        toast.error(transaction?.message);
      } else {
        toast.success('Transaction completed successfully.');
      }
    } catch (error: any) {
      console.log(error.response)
      toast.error(error.response);
    }
  };

  return (
    <div className="w-full text-white flex flex-col justify-center items-center -mt-4 sm:px-[70px] gap-8 p-4">
      <article className="text-lg">Exchange Crypto</article>
      <div className="w-full">
        <InputCurrency
          style="Send"
          setCurrency={setInputAmount}
          currency={inputAmount}
          tokenStyle={inputCurrency}
          setTokenStyle={setInputCurrency}
        /> 
        <div className={`bg-[#ffffff] text-red-500 text-[10px] -mt-2 ${inputError? "p-2" :"p-0"} rounded-b-md`}>
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
        className="w-full rounded-full border-[1px] border-[#dde2ea] py-2 bg-radial-gradient from-transparent to-[#9c5ef8]"
        onClick={handleTransaction}
      >
        Confirm
      </button>
    </div>
  );
}
