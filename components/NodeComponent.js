import React, { Component } from 'react'
import { motion } from 'framer-motion'

export default class NodeComponent extends Component {
    
    constructor( props ) {
        super(props)
        this.idName = "node" + "-" + this.props.row + "-" + this.props.col
        this.state = {
            path: false,
            visited: false
        }
    }
    
    componentDidUpdate () {
        const timers = this.props.timers
        if(this.props.type == "timed") {
            for (const timer of timers) {
                if (timer[0] == "visited") {
                    this.timeoutId_v = setTimeout(function () {
                        this.setState({visited: true})
                    }.bind(this), timer[1])
                }
                if (timer[0] == "path") {
                    this.timeoutId_p = setTimeout(function () {
                        this.setState({path: true})
                    }.bind(this), timer[1])
                }
            }
        }
    } 
        
    componentWillUnmount () {
        if (this.timeoutId_v) {
            clearTimeout(this.timeoutId_v);
        }
        if (this.timeoutId_p) {
            clearTimeout(this.timeoutId_p);
        }
    }
    
    render () {
        const row = this.props.row
        const col = this.props.col
        if (this.state.path) {
            return (
                <div 
                id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px bg-yellow-300 animate-pulse"
                />
            )
        }
        else if (this.state.visited) {
            return (
                <div 
                id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px bg-blue-300 transition-colors"
                />
                )
        }
        else {
            switch (this.props.type) {
                case "wall":
                    return (
                        <div 
                        id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px bg-gray-600"
                        onMouseDown={() => this.props.oMD(row,col)}
                        onMouseEnter={() => this.props.oME(row,col)}
                        onMouseUp={() => this.props.oMU(row,col)}
                        />
                        )
                case "start":
                    return (
                        <motion.div 
                        id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px bg-green-600"
                        whileHover={{scale:1.1}}
                        onMouseDown={() => this.props.oMD(row,col)}
                        onMouseEnter={() => this.props.oME(row,col)}
                        onMouseUp={() => this.props.oMU(row,col)}   
                        />
                            )
                case "finish":
                    return (
                        <motion.div 
                        id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px bg-red-600"
                        whileHover={{scale:1.1}}
                        onMouseDown={() => this.props.oMD(row,col)}
                        onMouseEnter={() => this.props.oME(row,col)}
                        onMouseUp={() => this.props.oMU(row,col)}    
                        />
                    )
                default:
                    return (
                        <div 
                        id={this.idName} className="w-6 h-6 md:w-8 md:h-8 m-px border-2 border-gray-200"
                        onMouseDown={() => this.props.oMD(row,col)}
                        onMouseEnter={() => this.props.oME(row,col)}
                        onMouseUp={() => this.props.oMU(row,col)}
                        />
                    )
            }
        }
    }
}
