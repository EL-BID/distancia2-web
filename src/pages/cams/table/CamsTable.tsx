import React from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'

import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import Plot from 'react-plotly.js'

import { useStore } from 'index'
import useStyles from './styles'
import { ActionHandler } from 'interfaces/Common'
import Snackbar from 'components/SnackbarAlert'
import LoadingOverlay from 'components/LoadingOverlay'
import { getColumnsDef } from './columnsDefinition'
import { Grid, Card } from '@material-ui/core'

const CamsTable: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const { cam: camStore } = useStore()
  const [isSnackOpen, setIsSnackOpen] = React.useState(false)
  const [mapZoom, setmapZoom] = React.useState(10)

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

  const handleRelayout = event => {
    if (event['mapbox.center'] !== undefined) {
      camStore.geoCenter = event['mapbox.center']
      setmapZoom(event['mapbox.zoom'])
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
    camStore.listRecords()
    let id = setInterval(() => camStore.listRecords(), 5000);

    return () => clearInterval(id);

    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (camStore.message.length > 0) {
      setIsSnackOpen(true)
    }

    // eslint-disable-next-line
  }, [camStore.message])

  const layoutMap = {
    title: 'Número de personas por cámara',
    autosize:true,
    mapbox: {
      style: 'open-street-map',
      center: camStore.geoCenter,
      zoom: mapZoom
    }
  }

  const layoutChart = {
    title: 'Porcetaje de personas incumpliendo distanciamiento',
    autosize:true,
  }

  return useObserver( () => (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Card elevation={3}>
            <Plot
              className={classes.plot}
              data={camStore.plotTableMap}
              layout={layoutMap}
              onRelayout={handleRelayout}
              useResizeHandler
            />
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card elevation={3}>
            <Plot
              className={classes.plot}
              data={camStore.plotTableBreakingPercent}
              layout={layoutChart}
              useResizeHandler
            />
          </Card>
        </Grid>
        <Grid item md={12}>
          <MUIDataTable
            title="Cámaras"
            data={camStore.cams.slice()}
            options={tableOptions}
            columns={columns}
          />
        </Grid>
      </Grid>

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

export default CamsTable
