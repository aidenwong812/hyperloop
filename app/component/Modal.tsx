

const Modal = ({ setTokenStyle, style, setIsModalShow, setTokenImage }: { setTokenStyle: any, style: string, setIsModalShow: any, setTokenImage: any }) => {
    const tokens = [
        { title: "BTC", name: "Bitcoin", image: "https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg" },
        { title: "ETH", name: "Ethereum", image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg" },
        { title: "ETH", name: "Ethereum(Base)", image: "https://content-api.changenow.io/uploads/ethbase_42ce14857a.svg" },
        { title: "ETH", name: "Ethereum(binanse Smart Chain)", image: "https://content-api.changenow.io/uploads/ethbsc_ef444521c5.svg" },
        { title: "TRX", name: "Tron", image: "https://content-api.changenow.io/uploads/trx_f14430166e.svg" },
        { title: "SOL", name: "Solana", image: "https://content-api.changenow.io/uploads/sol_3b3f795997.svg" },
        { title: "MATIC", name: "Polygon", image: "https://content-api.changenow.io/uploads/maticerc20_3ea50caa97.svg" },
        { title: "SUI", name: "Sui", image: "https://content-api.changenow.io/uploads/sui_6d4e2efb11.svg" },
        { title: "MOG", name: "Mog Coin", image: "https://content-api.changenow.io/uploads/mog_457505a2dd.svg" },
        { title: "Pepe", name: "pepe", image: "https://content-api.changenow.io/uploads/pepe_ebbbab2660.svg" },
    ]
    return (<>
        <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsModalShow(false)} />
        <div className={`absolute shadow-lg rounded-md flex flex-col bg-[#7e4bf7] 
        sm:right-[20%] sm:justify-start justify-center sm:h-[500px] sm:w-[342px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]
        z-10 w-full`}>
            <div className="flex justify-between px-4 py-4 sticky top-0 bg-[#8c60f5] rounded-t-md text-2xl">
                <article>Select a currency</article>
                <button onClick={() => setIsModalShow(false)}>&times;</button>
            </div>
            <div className="hover:overflow-auto overflow-hidden w-full">
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
                        }} className="flex border-t-[1px] border-[#808086] py-2 px-4 items-center gap-4 w-full">
                            <img src={token.image} alt="image" className="size-10" />
                            <div className="flex flex-col text-left">
                                <article className="text-[16px] text-white">{token.title}</article>
                                <article className="text-sm text-[#d1d1db]">{token.name}</article>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    </>
    )
}
export default Modal;