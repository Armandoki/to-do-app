import "../css/components/header.css";
import { hourlyGreeting } from "../utils/functions";

export default function Header() {
    return (
        <div className="header">
            <h1>Tareas</h1>
            <span>{hourlyGreeting()}</span>
        </div>
    );
}
