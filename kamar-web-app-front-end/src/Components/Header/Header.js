import React from 'react';
import HeaderItem from './HeaderItem';
import './header.css';
import {
    Link,
  } from "react-router-dom";

const Header = (props) => {

    const headerListItems = [
        {
          id: '0',
          classnames:'',
          item:'Home',
          link: '/Home'
        },
        {
          id: '1',
          classNames:'',
          item:'Subject Resources',
          link: '/SubjectResources' 
        },
        {
          id: '2',
          classNames:'',
          item:'Contact Us',
          link: '/Contact'  
        },
      ]

    const HeaderList = headerListItems.map((props, i) => {
        return (<HeaderItem key={headerListItems[i].id}
                            classNames={headerListItems[i].classNames}
                            item={headerListItems[i].item} 
                            link={headerListItems[i].link}/>)
    });
    return(
        <div className="nav-container">
            <div className="logo">
                <img src="" alt="logo"></img>
            </div>
                <ul className="header-links">
                  {HeaderList}
                </ul>
                <Link to='/SignIn' className='sign-in-header'>
                  <button onClick={props.signOut} className='sign-in-button'>
                    {props.isSignedIn?
                    'Sign Out':
                    'Sign In'}
                  </button>
                </Link>
        </div>
        );
}

export default Header