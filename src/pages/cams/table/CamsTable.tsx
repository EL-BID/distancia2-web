import React from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'

import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'

import { useStore } from 'index'
import { ActionHandler } from 'interfaces/Common'
import LoadingOverlay from 'components/LoadingOverlay'
import { getColumnsDef } from './columnsDefinition'

const CamsTable: React.FC = () => {
  const { cam: camStore } = useStore()
  const history = useHistory()

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

  return ( useObserver( () => (
    <>
      <MUIDataTable
        title="Cámaras"
        data={camStore.cams.slice()}
        options={tableOptions}
        columns={columns}
      />
      <LoadingOverlay pending={camStore.stateIsPending}/>
    </>
    ))
  )
}

export default CamsTable
