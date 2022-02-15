import React from "react";
import styles from './CallToAction.module.css'
import {url} from '../lib/storyblok'
import SbEditable from 'storyblok-react'
 
const CallToAction = (props) => {
    return <>
    <SbEditable content={props}>
        <a href={ url(props.url) } className={styles.card}>
            <h2>{ props.title } &rarr;</h2>
            <p>{ props.description }</p>
        </a>
        </SbEditable>
    </>;
};
 
export default CallToAction;