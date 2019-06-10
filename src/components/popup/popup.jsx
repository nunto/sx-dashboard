import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { blue, lightBlue } from '@material-ui/core/colors';
import DialogForm from './dialog_form';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import SwitchLabel from '../label/switch_label';


class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sqlChecked: true,
            widgets: ['Timeline', 'Line Chart', 'Pie Chart', 'Gauge']
        }
        this.dialogFormRef = React.createRef();
    }
    
    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleClick = (widget) => {
        this.handleClose();
        //this.props.onAddItem(widget);
        this.dialogFormRef.current.handleOpen(widget)
    }

    handleSwitch = () => {
        this.setState({ sqlChecked: !this.state.sqlChecked });
    }

    render() {
        return (
            <div>
            <Fab variant='extended' color='primary' aria-label='Add' onClick={this.handleOpen}>
                <AddIcon />
                Add Widget
            </Fab>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby='dialog' maxWidth='sm' fullWidth>
                <DialogTitle id='dialog-title'>Select a widget
                </DialogTitle>
                <div style={{margin: '16px'}}>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item><SwitchLabel bold={this.state.sqlChecked} label={'SQL'} /></Grid>
                    <Grid item>
                        <DataSwitch
                            checked={!this.state.sqlChecked}
                            onChange={this.handleSwitch}
                        />
                    </Grid>
                    <Grid item><SwitchLabel bold={!this.state.sqlChecked} label={'MQTT'} /></Grid>
                </Grid>
                </div>
                <Divider />
                <List>
                    {this.state.widgets.map(widget => (
                        <ListItem button onClick={() => this.handleClick(widget)} key={widget}>
                            <ListItemText primary={widget} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
            <DialogForm ref={this.dialogFormRef} onAddItem={this.props.onAddItem} dataType={this.state.sqlChecked}/>
        </div>
        )
    }
}

const DataSwitch = withStyles({
    switchBase: {
        color: blue[500],
        '&$checked': {
            color: blue[500],
            '& + $bar': {
                backgroundColor: lightBlue[200],
                opacity: 1
            }
        },
    },
    checked: {},
    bar: {
        backgroundColor: lightBlue[200],
        opacity: 1
    },
})(Switch);

export default Popup;

/**
 * '&$checked + $track': {
            backgroundColor: 'white',
            opacity: 1,
        },
 */