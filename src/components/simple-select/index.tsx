import {
  Select,
  SelectMenu,
  SelectOption,
  SelectValue,
} from '@/components/select'
import { useCallback, useMemo } from 'react'
import { SelectProps } from '@/components/select/type'

export interface SimpleSelectOption {
  id: string
  title: string
  isDisabled?: boolean
}

export interface SimpleSelectProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  data: SimpleSelectOption[]
  value: string
  onChange: (value: string) => void
}

export const SimpleSelect = (props: SimpleSelectProps) => {
  const { data, value, onChange, ...otherProps } = props

  const selectedValue = useMemo(() => [value], [value])

  const onSelectedValueChange = useCallback(
    (newValue: string[]) => {
      const other = newValue.filter((item) => item !== value)
      onChange(other.length ? other[0] : value)
    },
    [value, onChange]
  )

  const displayText = useMemo(
    () => data.find((item) => item.id === value)?.title,
    [data, value]
  )

  return (
    <Select
      {...otherProps}
      value={selectedValue}
      onChange={onSelectedValueChange}
    >
      <SelectValue>{displayText}</SelectValue>
      <SelectMenu>
        {data.map((option) => (
          <SelectOption
            value={option.id}
            key={option.id}
            isDisabled={option.isDisabled}
          >
            {option.title}
          </SelectOption>
        ))}
      </SelectMenu>
    </Select>
  )
}
