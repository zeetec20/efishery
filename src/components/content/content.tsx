import { PropsWithChildren } from "react"
import 'src/styles/components/content/content.scss'
import { IoMdNotifications } from 'react-icons/io'

const Content = ({ children }: PropsWithChildren) => {
    return (
        <div className="content">
            <div className="header">
                <div className="row">
                    <div className="column">
                        <h6 className="text-greting">Hello</h6>
                        <h1 className="text-name">Firman Lestari</h1>
                    </div>
                    <div className="notification">
                        <IoMdNotifications className="icon" />
                        <div className="count">6</div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Content