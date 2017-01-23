import * as React from "react";

export type BadgeLevel = "default" | "primary" | "success" | "info" | "warning" | "danger";
export interface BadgeProps {
    name: string;
    text: string;
    level: BadgeLevel;
}

const Badge = (props: BadgeProps) => (
    <span className={`badge badge-${props.level} ml-1`} key={props.name}>
        {props.text}
    </span>
);

export default Badge;
