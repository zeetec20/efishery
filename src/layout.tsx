import { PropsWithChildren } from "react"
import '~/styles/global.scss'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout