import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItems from '../items/list_items';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import theme from '../../theme/theme';

import Account from '../../views/account/account';
import Dashboard from '../../views/dashboard/dashboard';
import Devices from '../../views/devices/devices';
import MobileListItems from '../../components/items/mobile_list_items';
import routes from '../../routes';


const drawerWidth = 240;

class Sidebar extends Component {
    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    firstLetterUpper = word => {
        if (routes.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
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
                            <MenuIcon />
                        </IconButton>
                        <Title>{this.firstLetterUpper(window.location.pathname.replace('/main/', ''))}</Title>
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
    color: Black; 
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
 })

 Sidebar.propTypes = {
     classes: PropTypes.object.isRequired,
     theme: PropTypes.object.isRequired
 }

 export default withStyles(styles, { withTheme: true })(Sidebar);