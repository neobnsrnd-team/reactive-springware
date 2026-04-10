import type { BaseIconProps, IconName } from "./iconRegistry"

export interface IconProps extends BaseIconProps {
    name: IconName;
    className?: string;
}