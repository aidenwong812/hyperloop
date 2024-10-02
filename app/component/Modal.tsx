

const Modal = ({ setTokenStyle, style, setIsModalShow, setTokenImage }: { setTokenStyle: any, style: string, setIsModalShow: any, setTokenImage: any }) => {
    const tokens = [
        { title: "BTC", name: "Bitcoin", image: "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg" },
        { title: "ETH", name: "Ethereum", image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg" },
        { title: "Base", name: "Ethereum", image: "https://content-api.changenow.io/uploads/ethbase_42ce14857a.svg" },
        { title: "BSC", name: "Ethereum", image: "https://content-api.changenow.io/uploads/ethbsc_ef444521c5.svg" },
        { title: "TRX", name: "Tron", image: "https://content-api.changenow.io/uploads/trx_f14430166e.svg" },
        { title: "SOL", name: "Solana", image: "https://content-api.changenow.io/uploads/sol_3b3f795997.svg" },
        { title: "Matic", name: "Polygon", image: "https://content-api.changenow.io/uploads/maticerc20_3ea50caa97.svg" },
        { title: "Sui", name: "Sui", image: "https://content-api.changenow.io/uploads/sui_6d4e2efb11.svg" },
    ]
    return (<>
        <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsModalShow(false)} />
        <div className={`absolute shadow-lg rounded-md flex flex-col bg-[#7e4bf7] 
        sm:right-[20%] sm:justify-start justify-center sm:w-[342px] sm:top-[50%] sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%]
        z-10 w-full right-0 top-0 overflow-auto`}>
            <div className="flex justify-between px-4 py-4">
                <article>Select a currency</article>
                <button onClick={() => setIsModalShow(false)}>&times;</button>
            </div>
            {tokens.map((token) => {
                // For "Send" style, exclude "Sui" token
                if (style === "Send" && token.title === "Sui") return null;

                // For "Get" style, exclude "Matic" token
                if (style === "Get" && token.title === "Matic") return null;

                // Common rendering for both "Send" and "Get" styles
                return (
                    <button key={token.title} onClick={() => {
                        setTokenStyle(token.title);
                        setIsModalShow(false);
                        setTokenImage(token.image);
                    }} className="flex border-t-[1px] border-[#808086] py-2 px-4 items-center gap-4">
                        <img src={token.image} alt="image" className="size-10" />
                        <div className="flex flex-col text-left">
                            <article className="text-[16px] text-white">{token.title}</article>
                            <article className="text-sm text-[#d1d1db]">{token.name}</article>
                        </div>
                    </button>
                );
            })}
        </div>
    </>
    )
}
export default Modal;