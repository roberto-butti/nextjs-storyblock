import CallToAction from "./CallToAction";
import Placeholder from "./Placeholder";

const Components = {
    "Call To Action": CallToAction,
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