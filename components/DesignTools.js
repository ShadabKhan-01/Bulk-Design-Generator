import React from 'react'
import {  CircleDashed, Minus, PencilRuler, TextCursorInput, TriangleDashed } from 'lucide-react'
import { Rect, Circle, Triangle, Textbox, Line  } from 'fabric'
import { RectangleHorizontalIcon } from 'lucide-react'

const DesignTools = ({showDesignTools,canvas}) => {

  const addRect = ()=>{
    if (canvas){
      const shape = new Rect({
        top :100,
        left :50,
        width :100,
        height :60,
        fill :"#D84D42"
      })
      canvas.add(shape);
    }
  }
  const addCircle = ()=>{
    if (canvas){
      const shape = new Circle({
        top :100,
        left :50,
        radius: 50,
        fill :"#D84D42"
      })
      canvas.add(shape);
    }
  }
  const addTriangle = ()=>{
    if (canvas){
      const shape = new Triangle({
        top :100,
        left :50,
        fill :"#D84D42"
      })
      canvas.add(shape);
    }
  }
  const addText = ()=>{
    if (canvas){
      const shape = new Textbox("Hello World",{
        top :100,
        left :50,
      })
      canvas.add(shape);
    }
  }
  const addLine = ()=>{
    if (canvas){
      const shape = new Line([50, 50, 200, 50],{
        stroke: "black",
        strokeWidth: 5,
      })
      canvas.add(shape);
    }
  }

  return (
    <div>
      <aside
          className={`w-1/4 bg-black/20 backdrop-blur-lg p-4 shadow-lg absolute top-20 left-0 h-full transition-transform duration-300
          ${showDesignTools ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Designing Tools</h2>
          <div className="mt-4">
            <PencilRuler className="w-12 h-12 mx-auto text-white" />
            <p className="text-center mt-2">Editing Tools</p>
            <button className='hover:bg-black p-2 rounded' onClick={addRect}>
            <RectangleHorizontalIcon/>
            </button>
            <button className='hover:bg-black p-2 rounded' onClick={addCircle}>
            <CircleDashed/>
            </button>
            <button className='hover:bg-black p-2 rounded' onClick={addTriangle}>
            <TriangleDashed/>
            </button>
            <button className='hover:bg-black p-2 rounded' onClick={addText}>
            <TextCursorInput/>
            </button>
            <button className='hover:bg-black p-2 rounded' onClick={addLine}>
            <Minus/>
            </button>
          </div>
        </aside>
    </div>
  )
}

export default DesignTools
