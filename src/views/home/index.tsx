import { Box } from '@chakra-ui/react'
import { Select } from '@/components/select'
import { SelectValue } from '@/components/select/value'
import { SelectMenu } from '@/components/select/menu'
import { SelectOption } from '@/components/select/option'
import { useState } from 'react'

export const Home = () => {
  const [value, setValue] = useState([])

  return (
    <Box width="100%">
      home{Date.now()}1
      <Box width="240px" marginLeft="120px">
        <Select
          value={value}
          onChange={setValue}
          placeholder="xxxx xxxx xxxx xx"
        >
          <SelectValue>{value.toString()}</SelectValue>
          <SelectMenu>
            <SelectOption isDisabled value="111">
              111
            </SelectOption>
            <SelectOption value="222">222</SelectOption>
          </SelectMenu>
        </Select>
      </Box>
    </Box>
  )
}
