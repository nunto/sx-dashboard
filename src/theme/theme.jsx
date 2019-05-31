import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#0e5f9e'
        },
        secondary: {
            main: '#ffc249'
        }
    }
})

export default theme;