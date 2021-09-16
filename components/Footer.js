import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
    return (
        <footer className="flex items-center justify-center w-full h-20 border-t bg-black font-mono text-white">
        <p>&copy; {year}  <Link href="https://github.com/jl-gosewisch"><a className="hover:underline">Lennart Gosewisch</a></Link></p>
      </footer>
    )
}
