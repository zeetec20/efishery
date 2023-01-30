import * as Select from '@radix-ui/react-select'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import SelectItem from '../selectItem'
import { SizeType } from 'src/hooks/useSizes'
import 'src/styles/pages/fishPrice/selectSizeAddData.scss'

interface SelectSizeAddDataProps {
    sizes: SizeType[] | undefined
}

const SelectSizeAddData = ({ sizes }: SelectSizeAddDataProps) => {
    return (
        <Select.Root name='size'>
            <Select.Trigger className="select-trigger" id='size'>
                <Select.Value placeholder="Select a fruit…" />
                <Select.Icon>
                    <HiChevronDown className="select-icon" />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="select-content">
                    <Select.ScrollUpButton className="select-scroll-button">
                        <HiChevronUp className='icon' />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="select-viewport">
                        {sizes?.map(({ size }, index) => (
                            <SelectItem key={index} value={size.toString()}>{size}</SelectItem>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="select-scroll-button">
                        <HiChevronDown className='icon' />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default SelectSizeAddData