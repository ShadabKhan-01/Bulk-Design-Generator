import React, { useState, useEffect } from 'react'
import { PencilRuler } from 'lucide-react'
import CanvasDimensions from './CanvasDimensions'
import SnippingHelper from "@/components/SnappingHelper";import DeleteObj from './DeleteObj';


const LayersCustomization = ({ showDesignTools, canvas }) => {

  const [selectedObject, setselectedObject] = useState(null)
  const [width, setwidth] = useState("");
  const [height, setheight] = useState("");
  const [radius, setradius] = useState("");
  const [color, setcolor] = useState("");

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        handleObjectSelection(e.selected[0]);
      })
      canvas.on("selection:updated", (e) => {
        handleObjectSelection(e.selected[0]);
      })
      canvas.on("selection:cleared", () => {
        setselectedObject(null);
        clearSettings();
      })
      canvas.on("selection:modified", (e) => {
        handleObjectSelection(e.target);
      })
      canvas.on("selection:scaling", (e) => {
        handleObjectSelection(e.target);
      })
    }
  }, [canvas])

  const handleObjectSelection = (object) => {
    if (!object) return

    setselectedObject(object);

    setcolor(object.fill);

    if (object.type == "rect") {
      setwidth(Math.round(object.width * object.scaleX))
      setheight(Math.round(object.height * object.scaleY))
      setradius("");
    }
    else if (object.type == "circle") {
      setwidth("")
      setheight("")
      setradius(Math.round(object.radius * 2 * object.scaleX));
    }
  };

  const clearSettings = () => {
    setcolor("")
    setheight("")
    setwidth("");
    setradius("");
  }

  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setwidth(intValue)
    if (selectedObject && selectedObject.type == "rect" && intValue >= 0) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setheight(intValue)
    if (selectedObject && selectedObject.type == "rect" && intValue >= 0) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      canvas.renderAll();
    }
  }
  const handleColorChange = (e) => {
    const value = e.target.value;
    setcolor(value);
    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas.renderAll();
    }
  }
  const handleRadiusChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    setradius(intValue)
    if (selectedObject && selectedObject.type == "circle" && intValue >= 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  }

  return (
    <div>
      <aside
        className={`w-1/4 overflow-y-scroll bg-black/20 backdrop-blur-lg p-4 shadow-lg absolute top-20 right-0 h-full transition-transform duration-300
          ${showDesignTools ? "translate-x-0 opacity-100 block" : "translate-x-full opacity-0 pointer-events-none hidden"}`}
      >
        <h2 className="text-xl font-semibold mb-4">Layers & Customization</h2>
        <div className="mt-4">
          <PencilRuler className="w-12 h-12 mx-auto text-white" />
          <p className="text-center mt-2">Layer Options</p>
          <div className='Settings'>
            {selectedObject && (
              <>
              <DeleteObj canvas={canvas}/>
              <SnippingHelper canvas={canvas}/>
                <div>
                  <label className="block text-white mb-1">Color</label>
                  <input
                    type='color'
                    value={color}
                    onChange={(e) => handleColorChange(e)}
                    className="w-full px-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                  />
                </div>
              </>)}
            {selectedObject && selectedObject.type == "rect" && (
              <>
                <div>
                  <label className="block text-white mb-1">Width</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-1">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                  />
                </div>
              </>
            )
            }
            {selectedObject && selectedObject.type == "circle" && (
              <>
                <div>
                  <label className="block text-white mb-1">Radius</label>
                  <input
                    type="number"
                    value={radius}
                    onChange={(e) => handleRadiusChange(e)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-900 text-white"
                  />
                </div>
              </>
            )
            }
            <CanvasDimensions canvas={canvas} />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default LayersCustomization
