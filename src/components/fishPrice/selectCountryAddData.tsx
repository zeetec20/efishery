import React from 'react';
import * as Select from '@radix-ui/react-select';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import SelectItem from '../selectItem/selectItem';
import '@radix-ui/colors/blackA.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/violet.css';
import 'src/styles/pages/fishPrice/selectCountryAddData.scss';

const SelectCountryAddData = () => (
    <Select.Root>
        <Select.Trigger className="SelectTrigger" aria-label="Food">
            <Select.Value placeholder="Select a fruit…" />
            <Select.Icon className="SelectIcon">
                <HiChevronDown />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="SelectContent">
                <Select.ScrollUpButton className="SelectScrollButton">
                    <HiChevronUp />
                </Select.ScrollUpButton>
                <Select.Viewport className="SelectViewport">
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </Select.Viewport>
                <Select.ScrollDownButton className="SelectScrollButton">
                    <HiChevronDown />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
)



export default SelectCountryAddData;