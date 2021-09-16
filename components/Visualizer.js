import React, { useEffect, useState }  from 'react'
import GridComponent from './GridComponent'

export default function Visualizer() {

    const [width, setWidth] = useState(global.innerWidth)

    const R = 20
    let C

    const handleResize = () => {
        setWidth(global.innerWidth)
    }
    
    if (width < 350) {
        C = 10
    }
    else if (350 <= width && width <= 750) {
        C = 20
    }
    else {
        C = 30
    }
    
    useEffect(() => {
        global.addEventListener('resize', handleResize, false)
    }, [])

    return (
        <div className="flex flex-col">
                <GridComponent
                    cols={C}
                    rows={R}
                />
        </div>
    )
}

