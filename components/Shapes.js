import React from 'react'
import { CircleDashed, Minus, RectangleHorizontalIcon, TriangleDashed, TextCursorInput} from 'lucide-react'
import { Rect, Circle, Triangle, Textbox, Line } from 'fabric'

export const RectangleButton = ({ canvas }) => {
    const addRect = () => {
        if (canvas) {
            const shape = new Rect({
                top: 100,
                left: 50,
                width: 100,
                height: 60,
                fill: "#D84D42"
            })
            canvas.add(shape);
        }
    }
    return (
        <>
            <button className='hover:bg-black p-2 rounded' onClick={addRect}>
                <RectangleHorizontalIcon />
            </button>
        </>
    )
}
export const CircleButton = ({ canvas }) => {
    const addCircle = () => {
        if (canvas) {
            const shape = new Circle({
                top: 100,
                left: 50,
                radius: 50,
                fill: "#D84D42"
            })
            canvas.add(shape);
        }
    }
    
    return (
        <>
            <button className='hover:bg-black p-2 rounded' onClick={addCircle}>
                <CircleDashed />
            </button>
        </>
    )
}
export const LineButton = ({ canvas }) => {
    const addLine = () => {
        if (canvas) {
            const shape = new Line([50, 50, 200, 50], {
                stroke: "black",
                strokeWidth: 5,
            })
            canvas.add(shape);
        }
    }
    return (
        <>
            <button className='hover:bg-black p-2 rounded' onClick={addLine}>
                <Minus />
            </button>
        </>
    )
}

export const TriangleButton = ({ canvas }) => {
    const addTriangle = () => {
        if (canvas) {
            const shape = new Triangle({
                top: 100,
                left: 50,
                fill: "#D84D42"
            })
            canvas.add(shape);
        }
    }
    return (
        <>
            <button className='hover:bg-black p-2 rounded' onClick={addTriangle}>
                <TriangleDashed />
            </button>
        </>
    )
}

export const TextButton = ({canvas}) => {
    const addText = () => {
        if (canvas) {
            const shape = new Textbox("Hello World", {
                top: 100,
                left: 50,
            })
            canvas.add(shape);
        }
    }
    return (
        <>
            <button className='hover:bg-black p-2 rounded' onClick={addText}>
                <TextCursorInput />
            </button>
        </>
    )
}