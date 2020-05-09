import React from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'

import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'

import { useStore } from 'index'
import { ActionHandler } from 'interfaces/Common'
import Snackbar from 'components/SnackbarAlert'
import LoadingOverlay from 'components/LoadingOverlay'
import { getColumnsDef } from './columnsDefinition'

const CamsTable: React.FC = () => {
  const { cam: camStore } = useStore()
  const history = useHistory()
  const [isSnackOpen, setIsSnackOpen] = React.useState(false)

  const handleSnackClose = (event: any, reason: string = 'clickaway') => {
    camStore.clearState()
    setIsSnackOpen(false)
  }

  const onAction: ActionHandler = (camId, action) => {
    switch(action) {
      case 'detail':
        history.push(`/app/cams/${camId}`)
        break
    }
  }
  const columns = getColumnsDef(onAction)

  const tableOptions: MUIDataTableOptions = {
    print: false,
    download: false,
    selectableRows: 'none',
  }

  React.useEffect(() => {
    camStore.listCams()

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (camStore.message.length > 0) {
      setIsSnackOpen(true)
    }

    // eslint-disable-next-line
  }, [camStore.message])

  return ( useObserver( () => (
    <>
      <MUIDataTable
        title="Cámaras"
        data={camStore.cams.slice()}
        options={tableOptions}
        columns={columns}
      />

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
  )
}

export default CamsTable
