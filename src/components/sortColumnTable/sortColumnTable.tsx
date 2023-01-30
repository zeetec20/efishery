import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import 'src/styles/components/sortColumnTable/sortColumnTable.scss'

const SortColumnTable = ({ down, up }: { down?: boolean, up?: boolean }) => (
    <div className='wrap-sort-column-table column justify-content-center align-items-center'>
        <IoMdArrowDropup className={`icon-sort ${up ? 'active' : ''}`} />
        <IoMdArrowDropdown className={`icon-sort  ${down ? 'active' : ''}`} />
    </div>
)

export default SortColumnTable