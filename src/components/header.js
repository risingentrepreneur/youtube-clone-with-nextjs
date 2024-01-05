"use client"
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


export default function TopBar(){

    let [showSearch, setShowSearch]     = useState(false);

    return !showSearch ? <ShowSearchBar setShowSearch = {setShowSearch} /> : <HideSearchBar setShowSearch = {setShowSearch} />; 
}

function ShowSearchBar({ setShowSearch }){
    return (
        <nav className = "top-bar">
            <div>
                <Image
                src = "/youtube-white-logo.png"
                alt = "youtube-logo"
                width = {0}
                height = {0}
                sizes = "100vh"
                className = "logo"
                />
            </div>
            <div className = "right-side">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' onClick={ () => setShowSearch(true) } />
                <FontAwesomeIcon icon={faCircleUser} className='icon'/>
            </div>
        </nav>
    );
}

function HideSearchBar({ setShowSearch }){
    return (
        <nav className = "top-bar">
            <div className='search-on'>
                <FontAwesomeIcon icon={faArrowLeft} className='icon' onClick={ () => setShowSearch(false) } />
                <div className = "search-bar">
                    <input type = 'text' className='search-bar-input' placeholder='Search YouTube' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                </div>
                <div className = "round-btn">
                    <FontAwesomeIcon icon={faMicrophone} className='icon' />
                </div>
            </div>
        </nav>
    );
}