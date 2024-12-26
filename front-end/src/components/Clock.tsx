import React, { useRef, useEffect } from "react";

interface ClockProps {
    clockRef: React.RefObject<HTMLDivElement>;
    handlerRef: React.RefObject<HTMLDivElement>;
    minute: number;
    handleDrag: (e: React.MouseEvent) => void;
}

const Clock: React.FC<ClockProps> = ({ clockRef, handlerRef, minute, handleDrag }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // 캔버스에서 색칠하는 함수
    const drawCanvas = (minute: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const radius = canvas.width / 2;
        const centerX = radius;
        const centerY = radius;
        const endAngle = (minute / 60) * 2 * Math.PI; // minute을 각도로 변환 (0~2π)

        // 캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 배경 원
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#FEFCE8"; // 배경색
        ctx.fill();

        // 진행 원형
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius - 10, -Math.PI / 2, endAngle - Math.PI / 2);
        ctx.closePath();
        ctx.fillStyle = "#ffd700"; // 진행 색상
        ctx.fill();
    };

    useEffect(() => {
        drawCanvas(minute); // minute이 변경될 때마다 캔버스를 업데이트
    }, [minute]);

    const renderClockLines = () => {
        const lines = [];
        for (let i = 0; i < 60; i++) {
            const rotation = i * 6; // 각 선의 각도
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
        <div className="relative w-full h-full">
            <div
                ref={clockRef}
                className="w-full h-full bg-yellow-50 z-10 rounded-full scale-90 relative border-gray-200 border-2"
            >
                <canvas
                    width={400}
                    height={400}
                    ref={canvasRef}
                    className="rounded-full absolute -top-2.5 -left-2.5"
                ></canvas>
                <div
                    ref={handlerRef}
                    className="absolute z-20 cursor-pointer w-4 h-4 bg-gray-200 rounded-full"
                    onMouseDown={handleDrag}
                    style={{
                        top: "48%",
                        left: "48%",
                        transform: `rotate(${minute * 6 - 90}deg) translate(190px, 0)`, // 원형 경계 상에 핸들러 배치
                        transformOrigin: "center", // 회전 기준을 원의 중심으로 설정
                    }}
                ></div>
            </div>
            {renderClockLines()}
        </div>
    );
};

export default Clock;
