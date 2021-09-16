import React from 'react'
import { motion } from 'framer-motion'

export default function ControllButton({handler, text}) {
    return (
        <motion.button
        whileHover={{scale:1.1}}
        whileTap={{scale: .9}}
        type="button" className="rounded-md ml-1 mr-1 sm:ml-2 sm:mr-2 p-1 md:p-3 text-sm sm:text-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-yellow-400" onClick={() => handler()}>
            {text}
        </motion.button>
    )
}
