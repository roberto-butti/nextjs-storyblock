import React from "react";
import styles from './CallToAction.module.css'
import {url} from '../lib/storyblok'
 
const CallToAction = (props) => {
    /**
     * Instead of props.url you need to call props.url.url 
     * beacuse url in storyblok is an object
     */
    return <>
        <a href={ url(props.url) } className={styles.card}>
            <h2>{ props.title } &rarr;</h2>
            <p>{ props.description }</p>
        </a>
    </>;
};
 
export default CallToAction;