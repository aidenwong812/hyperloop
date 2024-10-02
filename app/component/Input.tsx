
import TokenButtons from "./Tokens";

const InputCurrency = (
    { style, setCurrency, currency, tokenStyle, setTokenStyle }:
        { style: string, setCurrency: any, currency: number, tokenStyle: string, setTokenStyle: any }
) => {
    const bitcoinImage = "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg";
    const ehtereumImage = "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg";
    return (
        <div className=" border-[1px] border-[#dde2ea] rounded-md flex gap-2 w-full">
            <div className="px-[17px] border-r-[1px] border-[#dde2ea] w-full">
                <article className=" text-sm text-opacity-70 opacity-80">You {style}</article>
                <input type="number" className="text-green-600 w-full bg-transparent ring-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pb-2"
                    value={currency} onChange={(e) => {
                        if(style === "Send")
                        setCurrency(e.target.value);
                    }} />
            </div>
            <TokenButtons tokenStyle={tokenStyle} setTokenStyle={setTokenStyle} style={style} tempTokenImage={style==="Send" ? bitcoinImage: ehtereumImage}/>
        </div>
    )
}
export default InputCurrency;