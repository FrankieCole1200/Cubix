
import { useTimer } from "../hooks/useTimer";
import { useSolveHistory } from "../../solves/hooks/useSolveHistory";
import { formatTime } from "../../../lib/formatTime";
import styles from "./Timer.module.css";

export default function Timer() {
    const { solves, saveTime } = useSolveHistory();

    const { timerState, elapsedTime } = useTimer(saveTime);

    const instructions = {
        IDLE: "Hold SPACE to start",
        HOLDING: "Keep holding...",
        READY: "Release!",
        RUNNING: "Press any key to stop",
        STOPPED: "Hold SPACE to start",
    };

    return (
        <div className={styles.container}>
            <h1 className={`${styles.time} ${styles[timerState.toLowerCase()]}`}>
                {formatTime(elapsedTime)}
            </h1>

            <p className={styles.instruction}>
                {instructions[timerState]}
            </p>

            <p>Total solves: {solves.length}</p>
            <div>
                <h2>Previous Solves</h2>

                {solves.map((solve, index) => (
                    <p key={index}>
                        Solve {index + 1}: {formatTime(solve.time)}
                    </p>
                ))}
            </div>
        </div>
    );
}
