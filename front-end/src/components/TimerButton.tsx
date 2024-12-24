type TimerButtonProps = {
    text: string; // 버튼에 표시할 텍스트
    onClick: () => void; // 클릭 핸들러
};

const TimerButton = ({ text, onClick }: TimerButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="bg-gray-200 hover:bg-gray-500 px-4 py-2 rounded"
        >
            {text}
        </button>
    );
};

export default TimerButton;