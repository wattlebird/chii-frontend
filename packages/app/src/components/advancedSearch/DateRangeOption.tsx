import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import dayjs, { Dayjs } from 'dayjs'
import { DateRange } from '../../graphql/index.generated'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { omitBy, isNil } from 'lodash'

interface IDateRangePickerProps {
  dateRange?: DateRange
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

const DateRangePicker: React.FunctionComponent<IDateRangePickerProps> = React.memo(({ dateRange, setDateRange }) => {
  const [display, setDisplay] = React.useState<string>('时间不限')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openDatePicker, setOpenDatePicker] = React.useState(false)
  const [datePickerError, setDatePickerError] = React.useState<string>('')
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleSetConvenienceDate = (option: string) => {
    let now = dayjs()
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
        setAnchorEl(null)
        return
    }
    setDateRange({
      gte: now.format('YYYY-MM-DD'),
    })
    setAnchorEl(null)
  }
  const handleCloseDatePicker = () => {
    if (datePickerError) setDatePickerError('')
    setOpenDatePicker(false)
  }
  const handleOpenDatePicker = () => {
    if (datePickerError) setDatePickerError('')
    setAnchorEl(null)
    setOpenDatePicker(true)
  }
  const setGte = (value: Dayjs | null) => {
    if (datePickerError) setDatePickerError('')
    setDateRange(
      omitBy(
        {
          ...dateRange,
          gte: value?.format('YYYY-MM-DD') ?? undefined,
        },
        isNil
      )
    )
  }
  const setLte = (value: Dayjs | null) => {
    if (datePickerError) setDatePickerError('')
    setDateRange(
      omitBy(
        {
          ...dateRange,
          lte: value?.format('YYYY-MM-DD') ?? undefined,
        },
        isNil
      )
    )
  }
  const handleDatePickerSave = () => {
    if (!dateRange || _.isEmpty(dateRange)) {
      setDateRange(undefined)
      setDisplay('时间不限')
      setOpenDatePicker(false)
      return
    }
    if (!!dateRange?.gte && !!dateRange?.lte) {
      if (dateRange.gte > dateRange.lte) {
        setDatePickerError('请确保开始时间小于或等于结束时间')
        return
      } else {
        setDisplay(`自 ${dateRange?.gte} 至 ${dateRange?.lte}`)
      }
    } else if (!dateRange?.gte) {
      setDisplay(`至 ${dateRange?.lte} 止`)
    } else if (!dateRange?.lte) {
      setDisplay(`自 ${dateRange?.gte} 起`)
    }
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
            <Grid sx={{ xs: 6 }}>开始日期</Grid>
            <Grid sx={{ xs: 6 }}>结束日期</Grid>
            <Grid sx={{ xs: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={dayjs(dateRange?.gte, 'YYYY-MM-DD')} onChange={setGte} />
              </LocalizationProvider>
            </Grid>
            <Grid sx={{ xs: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={dayjs(dateRange?.lte, 'YYYY-MM-DD')} onChange={setLte} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {datePickerError && <Typography sx={{ color: 'red' }}>{datePickerError}</Typography>}
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

export { DateRangePicker as DateRangeOption }
