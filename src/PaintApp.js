import React, { useRef, useState } from 'react';

function PaintApp() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.closePath();
        setIsDrawing(false);
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL("image/png");
        
        fetch('save_drawing.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: dataURL }),
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Show the response from the PHP backend
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h2>Paint Application</h2>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
            />
            <br />
            <button onClick={saveDrawing}>Save Drawing</button>
        </div>
    );
}

export default PaintApp;
