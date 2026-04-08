import type { IconProps } from "./IconProps.type";
import { ICON_REGISTRY } from "./iconRegistry"

export default function Icon({name, className, ...rest}: IconProps) {
    const Component = ICON_REGISTRY[name];

    if(!Component) return null;

    return <Component className={className} {...rest} />;
}