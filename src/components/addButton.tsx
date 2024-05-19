import "../css/components/addButton.css";
import { sounds } from "../utils/functions";

interface AddButtonProps {
    setShowModal: any
    setOptionModal: any
}

export default function AddButton({ setShowModal, setOptionModal }: AddButtonProps) {
    return (
        <button className="add-button" onClick={() => { sounds(); setOptionModal(1); setShowModal(true) }}>
            <i className="bi bi-plus"></i>
        </button>
    );
}
