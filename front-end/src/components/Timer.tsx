import { useEffect, useRef, useState } from "react";
import TimerButton from "./TimerButton";
import Clock from "./Clock.tsx";

const Timer = () => {
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const clockRef = useRef<HTMLDivElement | null>(null); // 시계 참조
    const handlerRef = useRef<HTMLDivElement | null>(null); // 핸들러 참조

    useEffect(() => {
        if (clockRef.current) {
            console.log("Clock ref is available:", clockRef.current);
        }
    }, []);

    const calculateAngle = (e: MouseEvent) => {
        if (!clockRef.current) {
            console.warn("Clock ref is null");
            return;
        }

        const rect = clockRef.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
        return angle < 0 ? angle + 360 : angle;
    };

    const handleDrag = (e: React.MouseEvent) => {
        e.preventDefault();

        const onMouseMove = (event: MouseEvent) => {
            const angle = calculateAngle(event);
            if (angle === undefined) return;

            // 각도를 분으로 변환 (360도 = 60분, 6도 = 1분)
            const newMinute = Math.floor(angle / 6);  // 360도 / 60분 = 6도

            // 분 값이 0과 59 사이로 제한되도록 함
            const limitedMinute = Math.min(Math.max(newMinute, 0), 59);

            setMinute(limitedMinute);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-yellow-50 flex-col gap-12">
            <div className="w-96 h-96 relative">
                <Clock clockRef={clockRef} handlerRef={handlerRef} minute={minute} handleDrag={handleDrag} />
            </div>
            <div className="w-full flex justify-center gap-4">
                {minute} : {second}
            </div>
        </div>
    );
};

export default Timer;
