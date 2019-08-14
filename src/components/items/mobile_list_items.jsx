import React, { Component } from 'react';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import ArrowBack from '@material-ui/icons/ArrowBack';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation'


// The routes that'll appear on the sidebar
const items = [
    { id: 'Dashboard', icon: <DashboardIcon />, path: '/main/dashboard'},
    { id: 'Devices', icon: <PermDeviceInformationIcon />, path: '/main/devices'},
    { id: 'Account', icon: <PeopleIcon />, path: '/main/account'},
]

//  Only real difference with the mobile list is that it has a back arrow at the top next to the main logo
// This component renders when the screen is smaller and the sidebar is hidden in a menu (md -)
class MobileListItems extends Component {
    render() {
        return (
            <div>
                <ListItem>
                    <ListItemIcon>
                        <div>
                            <IconButton onClick={this.props.handleDrawerToggle}>
                                <ArrowBack />
                            </IconButton>
                        </div>
                    </ListItemIcon>
                    <ListItemText primary="MTechHub"/>
                </ListItem>
                <Divider />
                {items.map(({ id, icon, path }) => (
                    <StyledListItem 
                        button
                        key={id}
                        component={Link} to={path}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{id}</ListItemText>
                    </StyledListItem>

                ))}
            </div>
        );
    }
}

const StyledListItem = withStyles({
    root: {
        '&$focusVisible': {
            backgroundColor: lightBlue[50],
          },
    },
    button: {
        color: lightBlue[700],
        '&:hover': {
            backgroundColor: lightBlue[50],
            '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
        },
        '&:active': {
            color: lightBlue[700]
        }
    },
    selected: {},
    focusVisible: {},
})(ListItem);

export default MobileListItems;