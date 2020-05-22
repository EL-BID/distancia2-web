import React from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
// import Plotly from 'plotly.js'
import Plot from 'react-plotly.js'
// import createPlotlyComponent from 'react-plotly.js/factory'


import { useStore } from 'index'
import useStyles from './styles'
import { ActionHandler } from 'interfaces/Common'
import Snackbar from 'components/SnackbarAlert'
import LoadingOverlay from 'components/LoadingOverlay'
import { getColumnsDef } from './columnsDefinition'
import { Grid, Card } from '@material-ui/core'


type State = {
  lat: number,
  lng: number,
  zoom: number,
}

const CamsTable: React.FC = () => {
  const history = useHistory()
  const classes = useStyles()
  const { cam: camStore } = useStore()
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

  React.useEffect(() => {
    let id = setInterval(() => camStore.listRecords(), 5000);

    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);

  // const dataMap: Partial<PlotCoordinate>[] = [
  //   {
  //     type: 'scattergeo', lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2]
  //   },
  // ]
  // var data = [{type: 'densitymapbox', lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2]}];

  // var layout = {width: 600, height: 400, mapbox: {style: 'stamen-terrain'}};

  // const Plot = createPlotlyComponent(Plotly);

  return useObserver( () => (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Card elevation={3} className="myDiv">
          {/* {React.createElement(Plot, {
            data: [
              {type: 'densitymapbox', lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2]}
            ],
            layout: {autosize:true, mapbox: {style: 'stamen-terrain'}}
          })} */}
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <Plot
              className={classes.plot}
              data={camStore.plotTableBreakingPercent}
              layout={{autosize:true}}
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
