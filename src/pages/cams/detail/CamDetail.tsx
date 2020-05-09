import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { useStore } from 'index'
import Snackbar from 'components/SnackbarAlert'
import LoadingOverlay from 'components/LoadingOverlay'
import { Typography } from '@material-ui/core'

const CamDetail: React.FC = () => {
  const { cam: camStore } = useStore()
  const { camId } = useParams()
  const [isSnackOpen, setIsSnackOpen] = React.useState(false)

  const handleSnackClose = (event: any, reason: string = 'clickaway') => {
    camStore.clearState()
    setIsSnackOpen(false)
  }

  React.useEffect(() => {
    camStore.getCam(camId)

    // eslint-disable-next-line
  }, [ camId ])

  React.useEffect(() => {
    if (camStore.message.length > 0) {
      setIsSnackOpen(true)
    }

    // eslint-disable-next-line
  }, [camStore.message])

  return useObserver( () => (
    <>
      { camStore.instance && <>
      <Typography variant="h4" component="h4" gutterBottom>
        {camStore.instance.name}
      </Typography>
      <img src={camStore.instance.image_stream} />
      </> }

      <LoadingOverlay pending={camStore.stateIsPending}/>
      <Snackbar
        open={isSnackOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        severity={camStore.isErrorMessage ? 'error' : 'success'}
        message={camStore.message}
      />
    </>
  ))
}

export default CamDetail
