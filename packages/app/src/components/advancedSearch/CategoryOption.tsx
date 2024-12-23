import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

interface ICategoryOptionProps {
  category: string
  setCategory: (cat: string) => void
}

export const CategoryOption = React.memo<ICategoryOptionProps>(({ category, setCategory }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <Select value={category} onChange={handleChange}>
        <MenuItem value='subject'>条目</MenuItem>
        <MenuItem value='anime'>- 动画</MenuItem>
        <MenuItem value='book'>- 书籍</MenuItem>
        <MenuItem value='music'>- 音乐</MenuItem>
        <MenuItem value='game'>- 游戏</MenuItem>
        <MenuItem value='real'>- 三次元</MenuItem>
        <MenuItem value='celebrity'>人物</MenuItem>
        <MenuItem value='person'>- 现实人物</MenuItem>
        <MenuItem value='character'>- 虚拟人物</MenuItem>
      </Select>
    </FormControl>
  )
})

CategoryOption.displayName = 'CategoryOption'
