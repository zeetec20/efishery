import * as Select from '@radix-ui/react-select'
import { HiCheck } from 'react-icons/hi'

const SelectItem = ({ className, children, ...props }: Select.SelectItemProps & React.RefAttributes<HTMLDivElement>) => (
    <Select.Item className={`SelectItem ${className}`} {...props}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
            <HiCheck />
        </Select.ItemIndicator>
    </Select.Item>
)

export default SelectItem