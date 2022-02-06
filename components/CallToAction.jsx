import React from "react";
import styles from './CallToAction.module.css'
 
const CallToAction = (props) => {
    return <>
        <a href={ props.url } className={styles.card}>
            <h2>{ props.title } &rarr;</h2>
            <p>{ props.description }</p>
        </a>
    </>;
};
 
export default CallToAction;