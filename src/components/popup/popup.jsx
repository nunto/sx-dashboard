import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class Popup extends Component {
    state = {
        open: false,
        widgets: ['Timeline', 'Line Chart', 'Pie Chart', 'Gauge']
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleClick = (widget) => {
        this.handleClose();
        this.props.onAddItem(widget);
    }

    render() {
        return (
            <div>
            <Fab variant='extended' color='primary' aria-label='Add' onClick={this.handleOpen}>
                <AddIcon />
                Add Widget
            </Fab>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby='dialog'>
                <DialogTitle id='dialog-title'>Select a widget</DialogTitle>
                <Divider />
                <List>
                    {this.state.widgets.map(widget => (
                        <ListItem button onClick={() => this.handleClick(widget)} key={widget}>
                            <ListItemText primary={widget} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
        )
    }
}

export default Popup;