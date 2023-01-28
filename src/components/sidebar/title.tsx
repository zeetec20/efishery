import { PropsWithChildren } from "react"
import 'src/styles/components/sidebar/title.scss'

const Title = ({ children }: PropsWithChildren) => {
    return (
        <h6 className="title">{children}</h6>
    )
}

export default Title