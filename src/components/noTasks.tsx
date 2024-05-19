import "../css/components/noTasks.css";
import Image from "next/image";

export default function NoTasks() {
    return (
        <div className="no-tasks">
            <h2>NO HAY TAREAS</h2>
            <Image
                src="/img/sad-cat.png"
                width={300}
                height={300}
                alt="No Tasks"
            />
        </div>
    );
}
