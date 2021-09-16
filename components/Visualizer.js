import React, { Component } from 'react'
import GridComponent from './GridComponent'

export default class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = { width: global.innerWidth }
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    handleResize() {
        let newWidth = global.innerWidth
        this.setState({width: newWidth})
    }

    render() {
        
        const R = 20
        let { width } = this.state
        let C

        if (width < 450) {
            C = 12
        }
        else if (450 < width && width < 1050) {
            C = 20
        }
        else {
            C = 30
        }

        return (
            <div className="flex flex-col">
                <GridComponent
                    cols={C}
                    rows={R}
                />
        </div>
        )
    }
}
