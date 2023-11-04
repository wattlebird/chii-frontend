import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import * as dayjs from 'dayjs'
import { DateRange } from '../../graphql/index.generated'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Grid from '@mui/material/Grid'

const DateRangePicker: React.FunctionComponent = React.memo(() => {
  const [display, setDisplay] = React.useState<string>('时间不限')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [dateRange, setDateRange] = React.useState<undefined | DateRange>()
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleSetConvenienceDate = (option: string) => {
    let now = new dayjs.Dayjs()
    switch (option) {
      case '1m':
        now = now.subtract(1, 'month')
        setDisplay('过去 1 个月内')
        break
      case '3m':
        now = now.subtract(3, 'month')
        setDisplay('过去 3 个月内')
        break
      case '6m':
        now = now.subtract(6, 'month')
        setDisplay('过去 6 个月内')
        break
      case '1y':
        now = now.subtract(1, 'year')
        setDisplay('过去 1 年内')
        break
      default:
        setDisplay('时间不限')
        setDateRange(undefined)
        return
    }
    setDateRange({
      gte: now.format('YYYY-MM-DD'),
    })
  }
  const handleCloseDatePicker = () => {
    setOpenDatePicker(false)
  }
  const handleOpenDatePicker = () => {
    setOpenDatePicker(true)
  }
  const setGte = (value) => {
    setDateRange({
      ...dateRange,
      gte: value,
    })
  }
  const setLte = (value) => {
    setDateRange({
      ...dateRange,
      lte: value,
    })
  }
  const handleDatePickerSave = () => {
    setOpenDatePicker(false)
  }

  return (
    <>
      <Button
        id='daterange-button'
        variant='text'
        aria-controls={open ? 'daterange-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {display}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id='daterange-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'daterange-button',
        }}
      >
        <MenuItem key='unset' value='unset' onClick={handleSetConvenienceDate.bind(this, 'unset')}>
          时间不限
        </MenuItem>
        <MenuItem key='1m' value='1m' onClick={handleSetConvenienceDate.bind(this, '1m')}>
          过去 1 个月内
        </MenuItem>
        <MenuItem key='3m' value='3m' onClick={handleSetConvenienceDate.bind(this, '3m')}>
          过去 3 个月内
        </MenuItem>
        <MenuItem key='6m' value='6m' onClick={handleSetConvenienceDate.bind(this, '6m')}>
          过去 6 个月内
        </MenuItem>
        <MenuItem key='1y' value='1y' onClick={handleSetConvenienceDate.bind(this, '1y')}>
          过去 1 年内
        </MenuItem>
        <MenuItem key='custom' onClick={handleOpenDatePicker}>
          自定义时间范围...
        </MenuItem>
      </Menu>
      <Dialog onClose={handleCloseDatePicker} aria-labelledby='customized-dialog-title' open={openDatePicker}>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          自定义时间范围
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              开始日期
            </Grid>
            <Grid item xs={6}>
              结束日期
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={setGte} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={(newValue) => setLte(newValue)} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDatePickerSave}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
})

DateRangePicker.displayName = 'DateRangePicker'

export { DateRangePicker }
