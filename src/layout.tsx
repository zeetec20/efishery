import { PropsWithChildren } from "react"
import 'src/styles/global.scss'
import Sidebar from "src/components/sidebar"
import Content from "src/components/content"
import MobileNav from "./components/mobileNav"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="main">
            <MobileNav />
            <Sidebar />
            <Content>
                {children}
            </Content>
            <div className="main-background"></div>
        </div>
    )
}

export default Layout