import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Canvas } from "fabric";

const LayersPanel = ({ canvas }) => {
    const [layers, setLayers] = useState([]);
    const [selectedLayer, setSelectedLayer] = useState(null);

    const addIdObject = (object) => {
        if (!object.id) {
            const timespan = new Date().getTime();
            object.id = `${object.type}_${timespan}`
        }
    }

    Canvas.prototype.updateZIndices = function () {
        const object = this.getObjects();
        object.forEach((obj, index) => {
            addIdObject(obj);
            obj.zIndex = index;
        });
    }

    // Update layer list when canvas changes
    const updateLayers = () => {
        if (canvas) {
            canvas.updateZIndices();
            const objects = canvas.getObjects().filter(
                (obj) =>
                    !(obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-"))
            ).map((obj) => ({
                id: obj.id,
                zIndex: obj.zIndex,
                type: obj.type,
            }));
            setLayers([...objects].reverse()); // Reverse to show top layers first
        }
    };

    const handleObjectSelected = (e) => {
        const selectedObject = e.selected ? e.selected[0] : null

        if (selectedObject) {
            setSelectedLayer(selectedObject.id)
        } else {
            setSelectedLayer(null)
        }
    }

    useEffect(() => {
        if (!canvas) return;

        canvas.on("object:added", updateLayers);
        canvas.on("object:removed", updateLayers);
        canvas.on("object:modified", updateLayers);

        canvas.on("selection:created", handleObjectSelected);
        canvas.on("selection:updated", handleObjectSelected);
        canvas.on("selection:cleared", () => setSelectedLayer(null));
        updateLayers(); // Initial update

        return () => {
            canvas.off("object:added", updateLayers);
            canvas.off("object:removed", updateLayers);
            canvas.off("object:modified", updateLayers);
            canvas.off("selection:created", handleObjectSelected);
            canvas.off("selection:updated", handleObjectSelected);
            canvas.off("selection:cleared", () => setSelectedLayer(null));
        };
    }, [canvas]);

    const selectLayerInCanvas = (layerId) => {
        const object = canvas.getObjects().find((obj) => obj.id === layerId)
        if (object) {
            canvas.setActiveObject(object);
            canvas.requestRenderAll();
            // setSelectedLayer();
        }
    };

    const moveSelectedLayers = (direction)=>{
        if(!selectedLayer) return

        const objects = canvas.getObjects();
        const selectedObject = objects.find((obj) => obj.id === selectedLayer);

        if(selectedObject){
            const currentIndex = objects.indexOf(selectedObject);

            if(direction == "up" && currentIndex < objects.length-1){
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex+1];
                objects[currentIndex+1] = temp;
            } else if(direction == "down" && currentIndex >0){
                const temp = objects[currentIndex];
                objects[currentIndex] = objects[currentIndex-1];
                objects[currentIndex-1] = temp;
            }

            const backgroundColor = canvas.backgroundColor;
            canvas.clear();
            
            objects.forEach((obj)=> canvas.add(obj));

            canvas.backgroundColor = backgroundColor;

            canvas.renderAll();

            objects.forEach((obj,index)=>{
                obj.zIndex = index;
            })

            canvas.setActiveObject(selectedObject);

            canvas.renderAll();

            updateLayers();
        }
    }

    return (
        <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
            <h2 className="text-lg font-bold">Layers Panel</h2>
            <div className="mt-4 space-y-2">
                {layers.map((layer, index) => (
                    <div
                        key={`${layer.id}+${index}`}
                        className={`p-2 cursor-pointer ${layer.id === selectedLayer ? "bg-gray-600" : "bg-gray-700"}`}
                        onClick={() => selectLayerInCanvas(layer.id)}
                    >
                        Layer {layer.type} {layer.zIndex}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
                <button onClick={()=>moveSelectedLayers("up")} className="bg-gray-500 p-2 rounded-md hover:bg-gray-400">
                    <ArrowUp />
                </button>
                <button onClick={()=>moveSelectedLayers("down")} className="bg-gray-500 p-2 rounded-md hover:bg-gray-400">
                    <ArrowDown />
                </button>
            </div>
        </aside>
    );
};

export default LayersPanel;
