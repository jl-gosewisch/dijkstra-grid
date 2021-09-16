import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
    return (
        <div className="w-full bg-black h-12 flex items-center justify-center text-center text-xs text-white font-mono ">
            <motion.p
            id="header--paragraph"
            animate={{ x: [-1800, 0], opacity: [0, 1] }}
            transition={{ duration: [3] }}
            >Hinweis: Dieses Hobbyprojekt wird kontinuierlich erweitert. Den aktuellen Code findest du auf&nbsp;
            <Link href="https://github.com/jl-gosewisch/dijkstra-grid"><a className="hover:underline">Github</a></Link>.
            </motion.p>
        </div>
    )
}
