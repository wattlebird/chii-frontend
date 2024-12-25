import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { RankRange } from '../../graphql/index.generated'
import Grid from '@mui/material/Grid2'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import { isEmpty } from 'lodash'

interface IRankRangePickerProps {
  id: string
  rankRange?: RankRange
  setRankRange: React.Dispatch<React.SetStateAction<RankRange | undefined>>
}

const RankRangePicker: React.FunctionComponent<IRankRangePickerProps> = React.memo(
  ({ id, rankRange, setRankRange }) => {
    const [display, setDisplay] = React.useState<string>('不限排名')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [range, setRange] = React.useState<number[]>([rankRange?.gte ?? 1, rankRange?.lte ?? 10000])
    const [changed, setChanged] = React.useState<boolean>(false)
    const open = Boolean(anchorEl)
    const handleClose = () => {
      setAnchorEl(null)
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleSetConvenienceRange = (option: string) => {
      switch (option) {
        case '100':
          setRankRange({
            gte: 1,
            lte: 100,
          })
          break
        case '1000':
          setRankRange({
            gte: 1,
            lte: 1000,
          })
          break
        default:
          setRankRange(undefined)
      }
      setAnchorEl(null)
    }
    const onClose = () => {
      setChanged(false)
      setRange([rankRange?.gte ?? 1, rankRange?.lte ?? 10000])
      setOpenDialog(false)
    }
    const onOpenSlider = () => {
      setAnchorEl(null)
      setOpenDialog(true)
    }

    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return
      }
      setChanged(true)
      if (activeThumb === 0) {
        setRange([Math.min(newValue[0], range[1]), range[1]])
      } else {
        setRange([range[0], Math.max(newValue[1], range[0])])
      }
    }

    const handleInputChange = (activeThumb: number, event: React.ChangeEvent<HTMLInputElement>) => {
      setChanged(true)
      if (activeThumb === 0) {
        setRange([event.target.value === '' ? 1 : Math.min(Number(event.target.value), range[1]), range[1]])
      } else {
        setRange([range[0], event.target.value === '' ? 1 : Math.max(Number(event.target.value), range[0])])
      }
    }

    const onCommit = () => {
      setRankRange({
        lte: range[1],
        gte: range[0],
      })
      setChanged(false)
      setOpenDialog(false)
    }

    // Button text react on rankRange change
    React.useEffect(() => {
      if (!rankRange || isEmpty(rankRange)) {
        setDisplay('不限排名')
      } else if (!!rankRange?.gte && !!rankRange?.lte) {
        setDisplay(`自 ${rankRange?.gte} 至 ${rankRange?.lte}`)
      } else if (!rankRange?.gte) {
        setDisplay(`至 ${rankRange?.lte} 止`)
      } else if (!rankRange?.lte) {
        setDisplay(`自 ${rankRange?.gte} 起`)
      }
    }, [rankRange])

    return (
      <>
        <Button
          id={id}
          variant='text'
          aria-controls={open ? `${id}-menu` : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {display}
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id={`${id}-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': id,
          }}
        >
          <MenuItem key='unset' value='unset' onClick={handleSetConvenienceRange.bind(this, 'unset')}>
            不限排名
          </MenuItem>
          <MenuItem key='1m' value='1m' onClick={handleSetConvenienceRange.bind(this, '100')}>
            前 100 名
          </MenuItem>
          <MenuItem key='3m' value='3m' onClick={handleSetConvenienceRange.bind(this, '1000')}>
            前 1000 名
          </MenuItem>
          <MenuItem key='custom' onClick={onOpenSlider}>
            自定义排名范围...
          </MenuItem>
        </Menu>
        <Dialog onClose={onClose} aria-labelledby='rank-range-slider' open={openDialog}>
          <DialogTitle sx={{ m: 0, p: 2 }} id='rank-range-slider'>
            自定义排名范围
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={2}>
                <MuiInput
                  value={range[0]}
                  size='small'
                  onChange={handleInputChange.bind(this, 0)}
                  inputProps={{
                    step: 1,
                    min: 1,
                    type: 'number',
                    'aria-labelledby': 'rank-range-slider',
                  }}
                />
              </Grid>
              <Grid size='grow'>
                <Slider
                  value={range}
                  onChange={handleSliderChange}
                  aria-labelledby='rank-range-slider'
                  disableSwap
                  min={1}
                  max={10000}
                />
              </Grid>
              <Grid size={2}>
                <MuiInput
                  value={range[1]}
                  size='small'
                  onChange={handleInputChange.bind(this, 1)}
                  inputProps={{
                    step: 1,
                    min: 1,
                    type: 'number',
                    'aria-labelledby': 'rank-range-slider',
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onCommit} disabled={!changed}>
              确定
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
)

RankRangePicker.displayName = 'RankRangePicker'

export { RankRangePicker as RankRangeOption }
