import ButtonDefault from "../button";
import React from "react";
import 'src/styles/components/sidebar/button.scss'
import { useMatch, useNavigate } from 'react-router-dom'

interface ButtonProps {
    icon: React.ReactNode
    text: React.ReactNode
    route: string,
}

const Button = ({ icon, text, route }: ButtonProps) => {
    const navigate = useNavigate()
    const match = useMatch({path: route})
    const onClick = () => navigate(route)

    return (
        <ButtonDefault onClick={onClick} className={`button ${match ? 'active' : ''}`}>
            {icon} {text}
        </ButtonDefault>
    )
}

export default Button