import { useState } from "react";
import TimerButton from "./TimerButton";

const Timer = () => {
    const [minute, setMinute] = useState(10);
    const [second, setSecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID 저장

    const startTimer = () => {
        if (isRunning) return; // 이미 실행 중이면 중단
        setIsRunning(true);

        const id = window.setInterval(() => {
            setSecond((prevSecond) => {
                if (prevSecond === 0) {
                    if (minute > 0) {
                        setMinute((prevMinute) => prevMinute - 1);
                        return 59;
                    } else {
                        stopTimer(); // 타이머 종료
                        return 0;
                    }
                }
                return prevSecond - 1;
            });
        }, 1000);

        setTimerId(id); // 타이머 ID 저장
    };

    const stopTimer = () => {
        if (timerId !== null) {
            window.clearInterval(timerId); // 타이머 중지
            setTimerId(null); // 타이머 ID 초기화
        }
        setIsRunning(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 flex-col">
            <div className="text-center p-6">
                <p className="text-2xl font-bold">
                    {String(minute).padStart(2, "0")} : {String(second).padStart(2, "0")}
                </p>
            </div>
            <div className="w-full flex justify-center gap-4">
                <TimerButton text={"시작"} onClick={startTimer} />
                <TimerButton text={"종료"} onClick={stopTimer} />
            </div>
        </div>
    );
};

export default Timer;
