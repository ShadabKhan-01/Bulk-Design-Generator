import { useState, useEffect } from "react";
import * as fabric from "fabric";

const DeleteObj = ({ canvas }) => {
    const deleteSelectedObject = () => {
        if (!canvas) return;
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
            canvas.discardActiveObject(); // Clear selection
            canvas.renderAll();
        }
    };

    return (
        <>
            <button onClick={deleteSelectedObject} className="p-2 bg-red-500 text-white rounded-md m-2">
                Delete Selected
            </button>
        </>
    )
}

export default DeleteObj;