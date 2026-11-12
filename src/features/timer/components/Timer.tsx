import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../../../lib/formatTime";
import styles from "./Timer.module.css";

export default function Timer() {
    const { timerState, elapsedTime } = useTimer();

    const instructions = {
        IDLE: "Hold SPACE to start",
        HOLDING: "Keep holding...",
        READY: "RELEASE!",
        RUNNING: "Press any key to stop",
    };

    return (
        <div className={styles.container}>
            <h1 className={`${styles.time} ${styles[timerState.toLowerCase()]}`}>
                {formatTime(elapsedTime)}
            </h1>

            <p className={styles.instruction}>
                {instructions[timerState]}
            </p>
        </div>
    );
}
