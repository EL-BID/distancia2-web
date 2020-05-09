
import React from 'react'
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from '@material-ui/core'

type LoadingProps = {
  pending: boolean,
}

const LoadingOverlay = (props: LoadingProps) => {

  return (
    <Dialog
      open={props.pending}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        Loading
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Message
        </DialogContentText>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  )
}

LoadingOverlay.defaultProps = {
  pending: false,
}

export default LoadingOverlay
