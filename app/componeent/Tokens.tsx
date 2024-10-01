import { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import Modal from "./Modal";
const TokenButtons = ({ tokenStyle, setTokenStyle }: { tokenStyle: string, setTokenStyle: any }) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const closeModal = () => { setIsModalShow(false); console.log(isModalShow) }
    return (
        <>
            <div className="flex gap-2 items-center" onClick={() => { setIsModalShow(true) }}>
                {tokenStyle}
                <RiArrowDownSFill />
            </div>
            {isModalShow && <Modal setTokenStyle={setTokenStyle} setIsModalShow={setIsModalShow} />}
        </>
    )
}
export default TokenButtons;
