
const Modal = ({ setTokenStyle, setIsModalShow }: { setTokenStyle: any, setIsModalShow: any }) => {
    const tokens = [
        { title: "BTC", style: "Bitcoin" },
        { title: "ETH", style: "Ethereum" },
        { title: "Base", style: "Ethereum" },
        { title: "BSC", style: "Ethereum" },
        { title: "TRX", style: "Tron" },
        { title: "SOL", style: "Solana" },
        { title: "Matic", style: "Polygon" },
        { title: "Sui", style: "Sui" },
    ]
        return (<>
                <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsModalShow(false)} />
                <div className="absolute shadow-lg rounded-md flex flex-col translate-x-36 bg-[#7e4bf7] justify-center w-[342px] z-10 pt-1">
                    <div className="flex justify-between px-4 py-2">
                        <article>Select a currency</article>
                        <button onClick={() => setIsModalShow(false)}>&times;</button>
                    </div>
                    {tokens.map((token) => (
                        <button key={token.title} onClick={() => { setTokenStyle(token.title); setIsModalShow(false)}} className="flex flex-col border-t-[1px] border-[#808086] py-2 px-4">
                            <article className=" text-[16px] text-white">{token.title}</article>
                            <article className=" text-sm text-[#d1d1db]">{token.style}</article>
                        </button>
                    ))}
                </div>
            </>
        )
}
export default Modal;