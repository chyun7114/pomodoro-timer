import React from "react";

interface ClockProps {
    clockRef: React.RefObject<HTMLDivElement>;
    handlerRef: React.RefObject<HTMLDivElement>;
    minute: number;
    handleDrag: (e: React.MouseEvent) => void;
}

const Clock: React.FC<ClockProps> = ({ clockRef, handlerRef, minute, handleDrag }) => {

    const renderClockLines = () => {
        const lines = [];
        for (let i = 0; i < 60; i++) {
            const rotation = i * 6; // 각 선의 각도
            let line;

            if (i % 5 === 0) {
                lines.push(
                    <div
                        key={i}
                        className="w-full h-0.5 bg-black absolute top-1/2"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    ></div>
                );
            } else {
                lines.push(
                    <div
                        key={i}
                        className="w-full h-0.5 bg-black absolute top-1/2"
                        style={{ transform: `rotate(${rotation}deg) scaleX(0.95)` }}
                    ></div>
                );
            }
        }
        return lines;
    };

    return (
        <>
            <div
                ref={clockRef}
                className="w-full h-full bg-yellow-50 z-10 rounded-full scale-90 relative border-gray-200 border-2"
            >
                <div
                    ref={handlerRef}
                    className="absolute z-20 cursor-pointer w-4 h-4 bg-gray-200 rounded-full"
                    onMouseDown={handleDrag}
                    style={{
                        top:"48%",
                        left:"48%",
                        transform: `rotate(${minute * 6 - 90}deg) translate(190px, 0)`, // 원형 경계 상에 핸들러 배
                        transformOrigin: "center", // 회전 기준을 원의 중심으로 설정
                    }}
                ></div>
            </div>
            {renderClockLines()}

        </>
    );
}

export default Clock;
