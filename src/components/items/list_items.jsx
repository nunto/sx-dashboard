import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation'


class ListItems extends Component {

    state = {
        items: [
            { id: 'Dashboard', icon: <DashboardIcon />, path: '/main/dashboard'},
            { id: 'Devices', icon: <PermDeviceInformationIcon />, path: '/main/devices'},
            { id: 'Account', icon: <PeopleIcon />, path: '/main/account'},
        ]
    }
    render() {
        return (
            <div>
                <ListItem>
                    <ListItemIcon />
                    <ListItemText primary="MTechHub" />
                </ListItem>
                <Divider />
                {this.state.items.map(({ id, icon, path }) => (
                    <ListItem 
                        button
                        key={id}
                        component={Link} to={path}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{id}</ListItemText>
                    </ListItem>

                ))}
            </div>
        );
    }
}

ListItems.propTypes = {
     classes: PropTypes.object.isRequired
 }

export default ListItems;