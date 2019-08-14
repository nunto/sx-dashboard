import { createMuiTheme } from '@material-ui/core/styles';


// Default theme for the project
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#0e5f9e'
        },
        secondary: {
            main: '#a5ebf0'
        }
    }
})

export default theme;