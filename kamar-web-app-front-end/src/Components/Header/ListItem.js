import React from 'react';
import {
    NavLink
  } from "react-router-dom";

const ListItem = (props) => {

    return (
            <React.Fragment>
                <NavLink to={props.link} className={props.classNames}>{props.item}</NavLink>
            </React.Fragment>
           );
}
export default ListItem;