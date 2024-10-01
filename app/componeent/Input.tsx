
import TokenButtons from "./Tokens";

const InputCurrency = ({ style, setCurrency, currency, tokenStyle, setTokenStyle }: { style: string, setCurrency: any,currency:number, tokenStyle:string, setTokenStyle:any }) => {
   
    return (
        <div className=" border-[1px] border-[#dde2ea] rounded-md flex gap-2 w-full">
            <div className="px-[17px] border-r-[1px] border-[#dde2ea] w-full">
                <article className=" text-sm text-opacity-70 opacity-80">You {style}</article>
                <input type="number" className=" bg-transparent ring-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={currency} onChange={(e) => {setCurrency(e.target.value);
                   
                }}/>
            </div>
            <TokenButtons tokenStyle = {tokenStyle} setTokenStyle = {setTokenStyle} />
        </div>
    )
}
export default InputCurrency;