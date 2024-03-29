import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
// Components
import Account from '../../views/account/account';
import Dashboard from '../../views/dashboard/dashboard';
import Devices from '../../views/devices/devices';
import ListItems from '../items/list_items';
import MobileListItems from '../../components/items/mobile_list_items';
import routes from '../../routes';
import Settings from '../../components/settings/settings';
import theme from '../../theme/theme';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';


// Width of the sidebar drawer
const drawerWidth = 240;

/*
    Loads the AppBar along the top, the navigation drawer along the side, and the content for each of the tabs in the middle.
    All the main content is rendered between the <main> tags.
*/
class Sidebar extends Component {
    state = {
        mobileOpen: false,
        settingsOpen: false,
        settingsAnchor: null
    }

    // Toggles whether the sidebar has an open icon or not
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    // Sets the first letter of a word to uppercase -- used for displaying the pathname
    firstLetterUpper = word => {
        if (routes.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
    
    // Settings menu could have options for changing the theme colours?
    settingsMenu = (event) => {
        // Need to fill in
        this.setState({
            settingsOpen: true,
            settingsAnchor: event.currentTarget
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
            <Root>
                <CssBaseline />
                <AppBar position='fixed' className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='Open menu'
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon style={{color: 'black'}}/>
                        </IconButton>
                        <Title>{this.firstLetterUpper(window.location.pathname.replace('/main/', ''))}</Title>
                        <IconButton
                            aria-label='Settings'
                            onClick={this.settingsMenu}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <Settings open={this.state.settingsOpen} anchor={this.state.settingsAnchor} />
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden lgUp implementation='css'>
                        <Drawer
                            variant={'temporary'}
                            anchor={'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >  
                            <List><MobileListItems handleDrawerToggle={this.handleDrawerToggle} /></List>
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation='css'>
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant='permanent'
                            open
                        >
                            <List><ListItems /></List>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path='/main/dashboard' component={Dashboard} />
                            <Route path='/main/devices' component={Devices} />
                            <Route path='/main/account' component={Account} />
                            <Redirect from='/main/*' to='/main/dashboard' />
                        </Switch>
                </main>
            </Root>
            </MuiThemeProvider>
        )
    }
}

/* Styled Components */
const Root = styled.div`
    display: flex;
`;

const Title = styled.h2`
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-weight: 300;
    font-size: 20px;
    line-height: 1.5em;
    color: black;
    flex-grow: 1;
    align: right;
`;

const styles = theme => ({ 
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        //background: 'transparent',
        backgroundColor: 'white',
        //boxShadow: 'none',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: '#fff',
        '& *': 'rgba(255, 255, 255, 0.7)',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
 });

 Sidebar.propTypes = {
     classes: PropTypes.object.isRequired,
     theme: PropTypes.object.isRequired
 };

export default withStyles(styles, { withTheme: true })(Sidebar);