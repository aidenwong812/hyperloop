
'use client'

import { useState } from "react";
import InputCurrency from "./componeent/Input";

export default function Home() {
  const [sendValue, setSendValue] :any = useState();
  const [getValue, setGetValue] :any = useState();
  const [address, setAddress] = useState("");
  const [sendStyle, setSendStyle] = useState("BTC");
  const [getStyle, setGetStyle] = useState("ETH");
  
  return (
    <div className="w-full text-white flex flex-col justify-center items-center py-[35px] px-[70px] gap-8 ">
      <article className="text-lg">Excahange Crypto</article>
      <InputCurrency style="Send" setCurrency={setSendValue} currency={sendValue} tokenStyle={sendStyle} setTokenStyle={setSendStyle}/>
      <InputCurrency style="Get" setCurrency={setGetValue} currency={getValue} tokenStyle={getStyle} setTokenStyle={setGetStyle}/>
      <div className=" flex flex-col w-full gap-1">
        <article>Recipient Wallet</article>
        <input className="w-full rounded-md outline-none bg-transparent border-[1px] border-[#dde2ea] py-2" placeholder="Enter the ETH payout address" onChange={(e) =>{setAddress(e.target.value)}}/>
      </div>
      <button className="w-full rounded-full border-[1px] border-[#dde2ea] py-2 bg-radial-gradient from-transparent to-[#9c5ef8]">Confirm</button>
    </div>

  );
}
