import React from "react";
import SbEditable from 'storyblok-react'

const Feature = (props) => {
    return <>
        <SbEditable content={props}>
        <h1   >
        {props.name}
        </h1>
        </SbEditable>
    </>;
};
 
export default Feature;