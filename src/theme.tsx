import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF9800',
      light: '#FFE0B2',
      dark: '#F57C00',
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    },
    secondary: {
      main: '#607D8B',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
    },
  },
})

export default theme
