import { PropsWithChildren } from "react"
import 'src/styles/global.scss'
import Sidebar from "src/components/sidebar"
import Content from "src/components/content"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="main">
            <Sidebar />
            <Content>
                {children}
            </Content>
            <div className="main-background"></div>
        </div>
    )
}

export default Layout