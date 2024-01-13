"use client"
import Image from 'next/image'
import topics from '/src/api/topics.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faCompass } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import Link from 'next/link';


export default function TopBar(props){

    const [showSearch, setShowSearch]     = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    


    function handleScroll(){

        const currentScrollPos = window.scrollY;

        if(currentScrollPos > 50 && !showSearch && currentScrollPos > prevScrollPos){
            setVisible(false);
        }else{
            setVisible(true);
        }

        setPrevScrollPos(currentScrollPos);
    }
    
    useEffect( () => {

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    });

    return <div id='navbar' className={`navbar ${visible ? 'visible' : 'hidden'}`}>
            {!showSearch ? <ShowSearchBar setShowSearch = {setShowSearch} /> : <HideSearchBar setShowSearch = {setShowSearch} />}
            {props.showNavigationAndTopicMenu && <NavigationMenuAndTopics />}
        </div>;
}

function ShowSearchBar({ setShowSearch }){
    return (
        <nav className = "top-bar">
            <div>
                <Link href="/">
                    <Image
                    src = "/youtube-white-logo.png"
                    alt = "youtube-logo"
                    width = {0}
                    height = {0}
                    sizes = "100vh"
                    className = "logo"
                    />
                </Link>
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



function NavigationMenuAndTopics(){

    function TopicList(){
      return topics.map((topic, key) => {
        const useClassName  = (topic == "All") ? "topic-tag active" : "topic-tag";
        return <span key={key} className={ useClassName }>{ topic }</span>;
      });
    }
    
    return (
      <div className = "navigation-menu-and-topics">
        <div className='menu-icon'>
          <FontAwesomeIcon icon={faCompass} className='icon'/>
        </div>
        <TopicList />
      </div>
    );
}