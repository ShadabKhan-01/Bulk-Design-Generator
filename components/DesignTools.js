import React from 'react'
import { PencilRuler} from 'lucide-react'
import { CircleButton, LineButton, RectangleButton, TextButton, TriangleButton } from './Shapes'

const DesignTools = ({showDesignTools,canvas}) => {

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
            <RectangleButton canvas={canvas}/>
            <CircleButton canvas={canvas}/>
            <TriangleButton canvas={canvas}/>
            <TextButton canvas={canvas}/>
           <LineButton canvas={canvas}/>
          </div>
        </aside>
    </div>
  )
}

export default DesignTools
