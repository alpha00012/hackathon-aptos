'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Menu() {
    const pathname = usePathname()
    const [currentMenuItem, setCurrentMenuItem] = useState("")

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-menu-item" : ""

    return (
        <>
            <ul id="menu-primary-menu" className="menu">
                <li className={`menu-item ${checkCurrentMenuItem("/")}`}>
                    <Link href="/dashboard">HOME</Link>
                </li>
                <li className={`menu-item ${checkCurrentMenuItem("/about")}`}>
                    <Link href="/about">ABOUT</Link>
                </li>
                <li className={`menu-item ${checkCurrentMenuItem("/contact")}`}>
                    <Link href="/contact">CONTACT</Link>
                </li>
            </ul>
        </>
    )
}
