
import React from 'react'

import MuiAlert, { Color } from '@material-ui/lab/Alert'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import {
  Snackbar,
  Slide,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'

export interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: Color;
  slideDirection?: 'left' | 'right' | 'up' | 'down';
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number;
  onClose?: (event: React.SyntheticEvent<any>, reason?: string) => void;
}


const SnackbarAlert: React.FC<SnackbarAlertProps> = (props) => {
  const slideComponent = (innerProps: TransitionProps) => <Slide {...innerProps} direction={props.slideDirection || 'left'} />

  return (
    <Snackbar
      anchorOrigin={props.anchorOrigin || { vertical: 'bottom', horizontal: 'right' }}
      open={props.open}
      autoHideDuration={props.autoHideDuration || 5000}
      onClose={props.onClose}
      TransitionComponent={slideComponent}
    >
      <MuiAlert 
        elevation={6}
        variant="filled"
        onClose={props.onClose}
        severity={props.severity}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>

  )
}

export default SnackbarAlert
