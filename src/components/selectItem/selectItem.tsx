import * as Select from '@radix-ui/react-select'
import { BsCheckLg } from 'react-icons/bs'

const SelectItem = ({ className, children, ...props }: Select.SelectItemProps & React.RefAttributes<HTMLDivElement>) => (
    <Select.Item className={`select-item ${className}`} {...props}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="select-item-indicator">
            <BsCheckLg className='icon' />
        </Select.ItemIndicator>
    </Select.Item>
)

export default SelectItem