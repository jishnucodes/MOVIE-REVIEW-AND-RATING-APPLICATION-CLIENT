import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader py-5">
            <div className="loader"></div>
            <p>Loading...</p> 
        </div>
    )
}

export default Preloader
