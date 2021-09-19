import React from 'react';
import {
    NavLink
  } from "react-router-dom";

const HeaderItem = (props) => {

    return (
            <NavLink to={props.link} className={props.classNames}>{props.item}</NavLink>
           );
}
export default HeaderItem;