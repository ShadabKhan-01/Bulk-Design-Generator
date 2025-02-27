import React from 'react'
import { PencilRuler } from 'lucide-react'

const LayersCustomization = ({showDesignTools}) => {
  return (
    <div>
       <aside
          className={`w-1/4 bg-black/20 backdrop-blur-lg p-4 shadow-lg absolute top-20 right-0 h-full transition-transform duration-300
          ${showDesignTools ? "translate-x-0 opacity-100 block" : "translate-x-full opacity-0 pointer-events-none hidden"}`}
        >
          <h2 className="text-xl font-semibold mb-4">Layers & Customization</h2>
          <div className="mt-4">
            <PencilRuler className="w-12 h-12 mx-auto text-white" />
            <p className="text-center mt-2">Layer Options</p>
          </div>
        </aside>
    </div>
  )
}

export default LayersCustomization
