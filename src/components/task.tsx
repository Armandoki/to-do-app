import "../css/components/task.css";
import { isColorDarkOrLight, convertDate, isToday } from "../utils/functions";
import { sounds } from "../utils/functions";

interface TaskProps {
    setShowModal: any
    setEditDataTask: any
    setOptionModal: any
    dataTask: any
    deleteTask: any
    toggleTaskDone: any
}

export default function Task({ setShowModal, setEditDataTask, setOptionModal, dataTask, deleteTask, toggleTaskDone }: TaskProps) {
    const today = isToday(dataTask.date)

    return (
        <div className={`task ${(today && !dataTask.done) ? 'today-animation' : ''}`} style={{ backgroundColor: dataTask.color, borderColor: dataTask.done ? "#198754" : "#dc3546", color: isColorDarkOrLight(dataTask.color) ? "#ffffff" : "#000000" }} >
            <div className="task-date">
                <span>{convertDate(dataTask.date)}</span>
            </div>
            <div>
                <div className="task-check">
                    <input className="form-check-input" type="checkbox" checked={dataTask.done} onChange={() => { sounds() ; toggleTaskDone(dataTask.id) }} />
                </div>
                <div className="task-info p-3">
                    <div>
                        <span>{dataTask.name}</span>
                    </div>
                    {dataTask.description.length > 0 && <p>{dataTask.description}</p>}
                </div>
                <div className="task-buttons">
                    <button onClick={() => { sounds(); setOptionModal(2); setEditDataTask(dataTask); setShowModal(true) }}><i className="bi bi-pencil-square" style={{ color: isColorDarkOrLight(dataTask.color) ? "#ffffff" : "#000000" }}></i></button>
                    <button onClick={() => { sounds(); deleteTask(dataTask.id) }}><i className="bi bi-trash3" style={{ color: isColorDarkOrLight(dataTask.color) ? "#ffffff" : "#000000" }}></i></button>
                </div>
            </div>
        </div>
    );
}
