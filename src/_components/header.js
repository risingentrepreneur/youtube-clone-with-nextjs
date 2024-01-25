"use client"
import Image from 'next/image'
import topics from '/src/api/topics.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faMagnifyingGlass, faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser, faCompass } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from "react"
import Link from 'next/link'

import '/public/assets/css/header.min.css';


export default function TopBar(props){

    const [showSearch, setShowSearch]     = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [sideNavigationVisibility, setSideNavigationVisibility] = useState("side-navigation hidden");
    


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

    return (
        <>
            <SideNavigation classAndVisibility = { sideNavigationVisibility } setSideNavigationVisibility = {setSideNavigationVisibility} />
            <div id='navbar' className={`navbar ${visible ? 'visible' : 'hidden'}`}>
                {!showSearch ? <ShowSearchBar setShowSearch = {setShowSearch} /> : <HideSearchBar setShowSearch = {setShowSearch} />}
                {props.showNavigationAndTopicMenu && <NavigationMenuAndTopics setSideNavigationVisibility = {setSideNavigationVisibility} />}
            </div>
        </>
    );
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

function NavigationMenuAndTopics({ setSideNavigationVisibility }){

    function TopicList(){
      return topics.map((topic, key) => {
        const useClassName  = (topic == "All") ? "topic-tag active" : "topic-tag";
        return <span key={key} className={ useClassName }>{ topic }</span>;
      });
    }
    
    return (
      <div className = "navigation-menu-and-topics">
        <div className='menu-icon' onClick={ () => setSideNavigationVisibility("side-navigation visible") }>
          <FontAwesomeIcon icon={faCompass} className='icon'/>
        </div>
        <TopicList />
      </div>
    );
}

function SideNavigation(props){

    function NavigationList(){

        let navigationList = [
            {
                heading     : null,
                listItems   : [
                    {icon  : faCompass, label : "Home"},
                    {icon  : faCompass, label : "Shorts"},
                    {icon  : faCompass, label : "Subscriptions"}
                ]
            },
            {
                heading     : null,
                listItems   : [
                    {icon  : faCompass, label : "You"},
                    {icon  : faCompass, label : "History"}
                ]
            },
            {
                heading     : "Explore",
                listItems   : [
                    {icon  : faCompass, label : "Trending"},
                    {icon  : faCompass, label : "Shopping"},
                    {icon  : faCompass, label : "Music"},
                    {icon  : faCompass, label : "Films"},
                    {icon  : faCompass, label : "Live"},
                    {icon  : faCompass, label : "Gaming"},
                    {icon  : faCompass, label : "News"},
                    {icon  : faCompass, label : "Sport"},
                    {icon  : faCompass, label : "Learning"},
                    {icon  : faCompass, label : "Fashion & beauty"},
                    {icon  : faCompass, label : "Podcasts"}
                ]
            },
            {
                heading     : null,
                listItems   : [
                    {icon  : faCompass, label : "Browse channels"}
                ]
            },
            {
                heading     : null,
                listItems   : [
                    {icon  : faCompass, label : "Settings"},
                    {icon  : faCompass, label : "Report history"},
                    {icon  : faCompass, label : "Help"},
                    {icon  : faCompass, label : "Send feedback"}
                ]
            }
        ];

        return navigationList.map((list, index) => {

            let heading         = (list.heading != null) ? <h5>{ list.heading }</h5> : "";
            let items           = list.listItems;
            
            function Items(){
                return items.map((item, index) => {
                    return (
                        <div className='nav-item' key={index}>
                            <FontAwesomeIcon icon={ item.icon } className='icon'/>
                            <label> { item.label } </label>
                        </div>
                    )
                });
            }

            return (
                <div className='nav-items-group' key={ index }>
                    { heading }
                    <Items />
                </div>
            );

        });
    }

    return (
        <div className= { props.classAndVisibility } >
            <div className='side-navigation-items'>
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
                <NavigationList />
            </div>
            <div className='close-side-navigation-area' onClick={ () => props.setSideNavigationVisibility("side-navigation hidden") }></div>
        </div>
    );
}