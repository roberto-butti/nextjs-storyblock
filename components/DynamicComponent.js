import CallToAction from "./CallToAction";
import Placeholder from "./Placeholder";
import Feature from "./Feature";

// { "storyblok-component-name" : ReactComponent}
const Components = {
    "Call To Action": CallToAction,
    "feature": Feature
};

const DynamicComponent = ({ blok }) => {
    if (typeof Components[blok.component] !== "undefined") {
        const Component = Components[blok.component];
        console.log(blok)
        return <Component {...blok} />;
    }
    return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;