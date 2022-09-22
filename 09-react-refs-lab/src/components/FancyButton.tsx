import React, { PropsWithChildren } from "react"
import './FancyButton.css'

type FancyButtonProps = PropsWithChildren<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>>

const FancyButton = (props:FancyButtonProps) => {

    const {children, ...other} = props;
    return (
        <button {...other} className="FancyButton">{props.children}</button>
    )
}