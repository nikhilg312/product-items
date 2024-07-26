import { useEffect, useState } from 'react';

const Alert = ({ message, duration, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log(duration);
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            {message}
        </div>
    );
};

export default Alert;
