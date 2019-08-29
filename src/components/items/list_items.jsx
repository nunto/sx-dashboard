import React, { Component } from 'react';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation'
// Icons
import PeopleIcon from '@material-ui/icons/People';


// The routes that'll appear on the sidebar
const items = [
    { id: 'Dashboard', icon: <DashboardIcon />, path: '/main/dashboard'},
    { id: 'Devices', icon: <PermDeviceInformationIcon />, path: '/main/devices'},
    { id: 'Account', icon: <PeopleIcon />, path: '/main/account'},
]

// This is the list that renders on larger screens (lg +)
class ListItems extends Component {
    render() {
        return (
            <div>
                <ListItem>
                    <ListItemText primary="MTechHub" />
                </ListItem>
                <Divider />
                {/* Render each menu item, redirecting to it's specified path on click */}
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
            color: lightBlue[700],
        }
    },
    selected: {},
    focusVisible: {},
})(ListItem);

export default ListItems;