// manages the timer's state, including starting, stopping, and measuring elapsed time

import { useState, useRef, useEffect } from "react";

type TimerState = "IDLE" | "HOLDING" | "READY" | "RUNNING" | "STOPPED";

const HOLD_DURATION_MS = 500;

export function useTimer(saveTime: (time: number) => void) {
    const [timerState, setTimerState] = useState<TimerState>("IDLE");
    const [elapsedTime, setElapsedTime] = useState(0);

    const startTime = useRef(0);
    const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const stateRef = useRef<TimerState>("IDLE");
    const saveTimeRef = useRef(saveTime);
    saveTimeRef.current = saveTime;
    const pressedKeys = useRef(new Set<string>());

    useEffect(() => {
        if (timerState !== "RUNNING") return;

        let animationFrame: number;

        const updateTimer = () => {
            setElapsedTime(performance.now() - startTime.current);
            animationFrame = requestAnimationFrame(updateTimer);
        };

        animationFrame = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(animationFrame);
    }, [timerState]);

    useEffect(() => {
        const changeState = (state: TimerState) => {
            stateRef.current = state;
            setTimerState(state);
        };

        const clearHoldTimeout = () => {
            if (holdTimeout.current !== null) {
                clearTimeout(holdTimeout.current);
                holdTimeout.current = null;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent Space from scrolling the page.
            if (event.code === "Space") {
                event.preventDefault();
            }

            // Ignore repeated keydown events.
            if (event.repeat || pressedKeys.current.has(event.code)) {
                return;
            }

            pressedKeys.current.add(event.code);
            
            // when a key is pressed to stop the timer
            if (stateRef.current === "RUNNING") {
                const finalTime = performance.now() - startTime.current;
                setElapsedTime(finalTime);
                changeState("STOPPED");
                saveTimeRef.current(finalTime);

                return;
            }

            if (event.code !== "Space" || (stateRef.current !== "IDLE" && stateRef.current !== "STOPPED")) {
                return;
            }

            changeState("HOLDING");

            holdTimeout.current = setTimeout(() => {
                if (stateRef.current === "HOLDING") {
                    changeState("READY");
                }
            }, HOLD_DURATION_MS);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            pressedKeys.current.delete(event.code);

            if (event.code !== "Space") return;

            clearHoldTimeout();

            if (stateRef.current === "READY") {
                startTime.current = performance.now();
                setElapsedTime(0);
                changeState("RUNNING");
            } else if (stateRef.current === "HOLDING") {
                changeState("IDLE");
            }
        };

        const handleBlur = () => {
            clearHoldTimeout();
            pressedKeys.current.clear();

            if (
                stateRef.current === "HOLDING" ||
                stateRef.current === "READY"
            ) {
                changeState("IDLE");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
            clearHoldTimeout();
        };
    }, []);

    return {
        timerState,
        elapsedTime,
    };
}
