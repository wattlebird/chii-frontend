import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Maybe } from '../../graphql/index.generated'
import Grid from '@mui/material/Grid2'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import { isEmpty, isNil, omitBy } from 'lodash'

type CompatibleRange = {
  gte?: Maybe<number>
  lte?: Maybe<number>
}

type ValidRange = {
  [k in keyof CompatibleRange]-?: NonNullable<CompatibleRange[k]>
}

export type MenuOption = {
  key: string
  value: string
  display: string
  gte?: number
  lte?: number
}

interface IRangePickerDialogProps {
  id: string
  range?: CompatibleRange
  defaultRange: ValidRange
  title?: string
  open: boolean
  onCommit: (_lte?: number, _gte?: number) => void
  onClose: () => void
}

interface IRangePickerMenuProps {
  id: string
  range?: CompatibleRange
  defaultRange: ValidRange
  menuOptions: MenuOption[]
  anchorEl: HTMLElement | null
  onCommit: (_lte?: number, _gte?: number) => void
  onClose: () => void
}

interface IRangePickerProps {
  id: string
  range?: CompatibleRange
  defaultRange: ValidRange
  setRange: React.Dispatch<React.SetStateAction<CompatibleRange | undefined>>
  defaultOptionKey: string
  menuOptions: MenuOption[]
}

const DefaultPickerDisplayText = '未指定'

const RangePickerDialog: React.FC<IRangePickerDialogProps> = React.memo(function RangePickerDialog({
  id,
  range,
  defaultRange,
  onCommit,
  open,
  onClose,
  title,
}) {
  const [gamme, setGamme] = React.useState<number[]>([range?.gte ?? defaultRange.gte, range?.lte ?? defaultRange.lte])
  const [changed, setChanged] = React.useState<boolean>(false)

  const handleSliderChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    setChanged(true)
    if (activeThumb === 0) {
      setGamme([Math.min(newValue[0], gamme[1]), gamme[1]])
    } else {
      setGamme([gamme[0], Math.max(newValue[1], gamme[0])])
    }
  }

  const handleInputChange = (activeThumb: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true)
    if (activeThumb === 0) {
      setGamme([
        event.target.value === '' ? defaultRange.gte : Math.min(Number(event.target.value), gamme[1]),
        gamme[1],
      ])
    } else {
      setGamme([
        gamme[0],
        event.target.value === '' ? defaultRange.lte : Math.max(Number(event.target.value), gamme[0]),
      ])
    }
  }

  const onCloseDialog = () => {
    setGamme([range?.gte ?? defaultRange.gte, range?.lte ?? defaultRange.lte])
    onClose()
  }

  const onSubmit = () => {
    onCommit(gamme[1], gamme[0])
    setChanged(false)
    onClose()
  }

  return (
    <Dialog id={id} onClose={onCloseDialog} aria-labelledby='rank-range-slider' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='rank-range-slider'>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={2}>
            <MuiInput
              value={gamme[0]}
              size='small'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(0, e)}
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
              value={gamme}
              onChange={handleSliderChange}
              aria-labelledby='rank-range-slider'
              disableSwap
              min={defaultRange.gte}
              max={defaultRange.lte}
            />
          </Grid>
          <Grid size={2}>
            <MuiInput
              value={gamme[1]}
              size='small'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(1, e)}
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
        <Button autoFocus onClick={onSubmit} disabled={!changed}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  )
})

const RangePickerMenu: React.FC<IRangePickerMenuProps> = React.memo(function RangePickerMenu({
  id,
  range,
  defaultRange,
  menuOptions,
  anchorEl,
  onClose,
  onCommit,
}) {
  const [dialogOpen, setOpenDialog] = React.useState<boolean>(false)
  const dialogTitle = React.useMemo(() => {
    return menuOptions.find((option) => option.key === 'custom')?.display
  }, [menuOptions])

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const onOpenSlider = () => {
    onClose()
    setOpenDialog(true)
  }

  const onClickMenuOption = (key: string) => {
    const option = menuOptions.find((option) => option.key === key)
    if (option && (option.gte !== undefined || option.lte !== undefined)) {
      onCommit(option?.lte, option?.gte)
    } else {
      onCommit()
    }
    onClose()
  }

  return (
    <>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={!isEmpty(anchorEl)}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': id,
        }}
      >
        {menuOptions.map((option) => {
          if (option.key !== 'custom') {
            return (
              <MenuItem key={option.key} onClick={() => onClickMenuOption(option.key)}>
                {option.display}
              </MenuItem>
            )
          } else {
            return (
              <MenuItem key={option.key} onClick={onOpenSlider}>
                {option.display}
              </MenuItem>
            )
          }
        })}
      </Menu>
      <RangePickerDialog
        id={`${id}-dialog`}
        range={range}
        defaultRange={defaultRange}
        title={dialogTitle}
        open={dialogOpen}
        onCommit={onCommit}
        onClose={onCloseDialog}
      />
    </>
  )
})

const RangePicker: React.FunctionComponent<IRangePickerProps> = React.memo(
  ({ id, range, setRange, defaultRange, defaultOptionKey, menuOptions }) => {
    const defaultDisplay = React.useMemo(() => {
      return menuOptions.find((option) => option.key === defaultOptionKey)?.display || DefaultPickerDisplayText
    }, [menuOptions])
    const [display, setDisplay] = React.useState<string>(defaultDisplay)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const menuOpen = !isEmpty(anchorEl)

    const onCloseMenu = () => {
      setAnchorEl(null)
    }

    const onCommit = (lte?: number, gte?: number) => {
      setRange(
        omitBy(
          {
            lte,
            gte,
          },
          (item) => isNil(item)
        )
      )
    }

    const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }

    // Button text react on range change
    React.useEffect(() => {
      if (!range || isEmpty(range)) {
        setDisplay(defaultDisplay)
      } else if (!!range?.gte && !!range?.lte) {
        setDisplay(`自 ${range?.gte} 至 ${range?.lte}`)
      } else if (!range?.gte) {
        setDisplay(`至 ${range?.lte} 止`)
      } else if (!range?.lte) {
        setDisplay(`自 ${range?.gte} 起`)
      }
    }, [range])

    return (
      <>
        <Button
          id={id}
          variant='text'
          aria-controls={menuOpen ? `${id}-menu` : undefined}
          aria-haspopup='true'
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={onOpenMenu}
        >
          {display}
          <ArrowDropDownIcon />
        </Button>
        <RangePickerMenu
          id={`${id}-menu`}
          range={range}
          defaultRange={defaultRange}
          menuOptions={menuOptions}
          anchorEl={anchorEl}
          onCommit={onCommit}
          onClose={onCloseMenu}
        />
      </>
    )
  }
)

RangePicker.displayName = 'RangePicker'

export { RangePicker as RangeOption }
