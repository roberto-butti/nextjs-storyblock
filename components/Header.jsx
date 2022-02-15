import React from "react";
import styles from './Header.module.css'
import SbEditable from 'storyblok-react'

const Header = (props) => {
    return <>
        <SbEditable content={props}>
        <h1  className={styles.title} >
        {props.title}
        </h1>
        </SbEditable>
    </>;
};
 
export default Header;