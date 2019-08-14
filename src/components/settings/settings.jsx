import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class Settings extends Component {
    state = {
        anchor: this.props.anchorEl,
        open: this.props.open
    }


    render() {
        const { open, anchor } = this.state;

        return (
            <Menu
                open={open}
                anchorEl={anchor}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Theme</MenuItem>
                <MenuItem>Save</MenuItem>
            </Menu>
        );
    }
}

export default Settings;