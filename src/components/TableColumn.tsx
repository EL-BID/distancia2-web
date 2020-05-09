import React from 'react'

import { 
  ButtonGroup,
  Tooltip,
  Button
} from '@material-ui/core'
import {
  CheckCircle as CheckCircleIcon,
  Videocam as VideocamIcon,
  Cancel as CancelIcon
} from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'
import { ActionHandler } from 'interfaces/Common'

export const booleanColumn = (value: boolean) => (value ?
  <CheckCircleIcon style={{ color: green[500] }}/> :
  <CancelIcon style={{ color: red[500] }}/>
)

export const listStringColumn = (value: [string]) => value.join(', ')

export const camsTableActionsColumn = (onAction: ActionHandler) => (_: any, { rowData }: any) => {
  return (
    <ButtonGroup variant="text">
      <Tooltip title="Ver Cámara" aria-label="camera">
        <Button onClick={ () => onAction(rowData[0], 'detail') }>
          <VideocamIcon/>
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}
