import React from 'react'
import ReactDOM from 'react-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import * as serviceWorker from './serviceWorker'
import RootStore from "stores/RootStore"
import App from 'components/App'
import theme from './theme'

export const StoreContext = React.createContext<RootStore>({} as RootStore)
export const useStore = (): RootStore => React.useContext(StoreContext)

ReactDOM.render(
  <StoreContext.Provider value={ new RootStore() }>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App/>
    </ThemeProvider>
  </StoreContext.Provider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
