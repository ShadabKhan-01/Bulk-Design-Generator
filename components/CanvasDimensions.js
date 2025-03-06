import React from 'react'
import { useState, useEffect } from 'react'

const CanvasDimensions = ({ canvas }) => {
    const [canvasWidth, setCanvasWidth] = useState(530)
    const [canvasHeight, setCanvasHeight] = useState(330)
    const [canvasColor, setCanasColor] = useState("#ffffff"); 

    useEffect(() => {
        if (canvas) {
            canvas.setWidth(canvasWidth);
            canvas.setHeight(canvasHeight);
            canvas.backgroundColor = canvasColor
            canvas.renderAll()
        }

    }, [canvasHeight, canvasWidth, canvas, canvasColor])

    const handleColorChange = (e) => {
        const value = e.target.value;
        setCanasColor(value);
        if (canvas) {
          setCanasColor(value);
        //   console.log(value)
        }
      }

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const initvalue = parseInt(value, 10);
        if (initvalue >= 0) {
            setCanvasWidth(initvalue);
        }
    };
    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const initvalue = parseInt(value, 10);
        if (initvalue >= 0) {
            setCanvasHeight(initvalue);
        }
    };

    return (
        <div className='border-2 p-3 border-dashed  '>
            <div>
                  <label className="block text-white mb-1">CanvasColor</label>
                  <input
                    type='color'
                    value={canvasColor}
                    onChange={(e) => handleColorChange(e)}
                    className="w-full px-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                  />
                </div>
            <div>
                <label className="block text-white mb-1">CanasWidth</label>
                <input
                    type="number"
                    value={canvasWidth}
                    onChange={(e) => handleWidthChange(e)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                />
            </div>
            <div>
            <label className="block text-white mb-1">CanvasHeight</label>
                <input
                    type="number"
                    value={canvasHeight}
                    onChange={(e) => handleHeightChange(e)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                />
            </div>
        </div>
    )
}

export default CanvasDimensions
