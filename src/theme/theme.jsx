import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#d3ccff'
        },
        secondary: {
            main: '#ffc249'
        }
    }
})

export default theme;