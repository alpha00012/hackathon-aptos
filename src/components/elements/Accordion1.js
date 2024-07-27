'use client'
import { useState } from 'react'

export default function Accordion1() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <>
            <div className="tf-flat-accordion2">
                <div className="flat-toggle2 active">
                    <h6 className={isActive === 1 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(1)}>What is Binabox?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 1 ? "block" : "none"}` }}>
                        <p>Binabox is a decentralized event management platform leveraging blockchain technology and NFTs to ensure transparency, security, and efficiency in organizing and attending events.</p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6 className={isActive === 2 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(2)}>How do I create an event on Binabox?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 2 ? "block" : "none"}` }}>
                        <p>To create an event on Binabox, simply sign up, navigate to the "Create Event" section, fill in the necessary details, and publish your event. It's that easy!</p>
                    </div>
                </div>
                <div className="flat-toggle2">
                    <h6 className={isActive === 3 ? "toggle-title active" : "toggle-title"} onClick={() => handleClick(3)}>How do I buy tickets for an event?</h6>
                    <div className="toggle-content" style={{ display: `${isActive === 3 ? "block" : "none"}` }}>
                        <p>You can buy tickets by browsing the events listed on Binabox, selecting the event you're interested in, and purchasing the tickets through our secure platform. Tickets are issued as NFTs, ensuring their authenticity.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
