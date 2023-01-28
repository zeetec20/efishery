import React, { PropsWithChildren } from "react"
import 'src/styles/components/button/button.scss'

type ButtonProps = PropsWithChildren & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({className, children, ...props}: ButtonProps) => (
    <button className={`btn ${className}`} {...props}>
        {children}
    </button>
)

export default Button