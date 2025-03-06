import { useEffect, useState } from "react";
import { Line } from "fabric";
import Switch from "./Switch";

const SnippingHelper = ({ canvas }) => {
    const [gridsnip, setgridsnip] = useState(false)
    useEffect(() => {
        if (!canvas) return;

        const gridSize = 10; // Grid snapping size
        const snapThreshold = 15; // Snapping threshold
        let lines = []; // Store guideline objects

        canvas.on("object:moving", (e) => snapObject(e.target));
        canvas.on("object:scaling", (e) => snapObject(e.target));
        canvas.on("object:rotating", (e) => snapObject(e.target));

        canvas.on("mouse:up", removeGuidelines); // Remove guidelines when the user releases the object
        canvas.on("selection:cleared", removeGuidelines); // Remove guidelines when no object is selected

        function snapObject(obj) {
            if (!obj) return;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;

            const objCenterX = obj.left + (obj.width * obj.scaleX) / 2;
            const objCenterY = obj.top + (obj.height * obj.scaleY) / 2;

            removeGuidelines(); // Remove previous guidelines before adding new ones

            // Snap to grid
            if (gridsnip) {
                obj.set({
                    left: Math.round(obj.left / gridSize) * gridSize,
                    top: Math.round(obj.top / gridSize) * gridSize,
                });
            }

            // Draw and snap to center guidelines
            if (Math.abs(objCenterX - centerX) < snapThreshold) {
                obj.set({ left: centerX - (obj.width * obj.scaleX) / 2 });
                drawGuideline(centerX, 0, centerX, canvasHeight); // Vertical Center Line
            }
            if (Math.abs(objCenterY - centerY) < snapThreshold) {
                obj.set({ top: centerY - (obj.height * obj.scaleY) / 2 });
                drawGuideline(0, centerY, canvasWidth, centerY); // Horizontal Center Line
            }

            // Draw and snap to corners
            if (Math.abs(obj.left) < snapThreshold) {
                obj.set({ left: 0 });
                drawGuideline(0, 0, 0, canvasHeight); // Left Edge
            }
            if (Math.abs(obj.top) < snapThreshold) {
                obj.set({ top: 0 });
                drawGuideline(0, 0, canvasWidth, 0); // Top Edge
            }
            if (Math.abs(obj.left + obj.width * obj.scaleX - canvasWidth) < snapThreshold) {
                obj.set({ left: canvasWidth - obj.width * obj.scaleX });
                drawGuideline(canvasWidth, 0, canvasWidth, canvasHeight); // Right Edge
            }
            if (Math.abs(obj.top + obj.height * obj.scaleY - canvasHeight) < snapThreshold) {
                obj.set({ top: canvasHeight - obj.height * obj.scaleY });
                drawGuideline(0, canvasHeight, canvasWidth, canvasHeight); // Bottom Edge
            }

            obj.setCoords(); // Update object coordinates
        }

        function drawGuideline(x1, y1, x2, y2) {
            const line = new Line([x1, y1, x2, y2], {
                stroke: "blue",
                strokeWidth: 1,
                strokeDashArray: [5, 5], // Dashed line
                selectable: false,
                evented: false,
                excludeFromExport: true,
            });

            canvas.add(line);
            lines.push(line);
        }

        function removeGuidelines() {
            lines.forEach((line) => canvas.remove(line));
            lines = []; // Reset the guidelines array
        }

        return () => {
            canvas.off("object:moving");
            canvas.off("object:scaling");
            canvas.off("object:rotating");
            canvas.off("mouse:up", removeGuidelines);
            canvas.off("selection:cleared", removeGuidelines);
            removeGuidelines();
        };
    }, [canvas,gridsnip]);

    return (<>
        <div>
            <Switch gridsnip = {gridsnip} setgridsnip={setgridsnip} text ={"Grid Snipping "}/>
        </div>
    </>
    )
};

export default SnippingHelper;
