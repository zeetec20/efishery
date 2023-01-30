import React from 'react';
import * as Select from '@radix-ui/react-select';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import SelectItem from '../selectItem/selectItem';
import 'src/styles/pages/fishPrice/selectCountryAddData.scss';
import { CountryType } from 'src/hooks/useCountries';
import {uppercaseFirstWord} from 'src/helper'

interface SelectCountryAddDataProps {
    countries: CountryType[] | undefined
}

const SelectCountryAddData = ({countries}: SelectCountryAddDataProps) => (
    <Select.Root name='country'>
        <Select.Trigger className="select-trigger" id='country'>
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
                    {countries?.map((country, index) => (
                        <SelectItem key={index} value={JSON.stringify(country)}>{uppercaseFirstWord(country.province.toLowerCase())} - {uppercaseFirstWord(country.city.toLowerCase())}</SelectItem>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton className="select-scroll-button">
                    <HiChevronDown className='icon' />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
)

export default SelectCountryAddData;