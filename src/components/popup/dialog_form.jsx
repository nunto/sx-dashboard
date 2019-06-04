import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles'


import '../../assets/css/styles.css';

const data_tags = ['ai1', 'ai2', 'ai3', 'di1', 'di2', 'di3']
const data_types = ['Current', 'Pressure', 'Flow']
const msg = 'Please fill all required fields.'

class DialogForm extends Component {
    state = {
        type: '',
        open: false,
        sensorName: '',
        dbName: '',
        dataTag: data_tags[0],
        dataType: data_types[0],
        snackbarOpen: false
    }

    handleOpen = (type) => {
        this.setState({ 
            open: true,
            type: type
        })
    }

    handleSubmit = () => {
        if (this.state.sensorName === '' || this.state.dbName === '') {
            this.setState({ snackbarOpen: true })
        }
        else {
            this.props.onAddItem(this.state.type)
            this.setState({ 
                open: false,
                sensorName: '',
                dbName: '' 
            })
        }
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false })
    }

    handleChange = (field) => (event) => {
        switch(field) {
            case 'sensor-name':
                this.setState({ sensorName: event.target.value })
                break;
            case 'db-name':
                this.setState({ dbName: event.target.value })
                break;
            case 'data-tag':
                this.setState({ dataTag: event.target.value })
                break;
            case 'data-type':
                this.setState({ dataType: event.target.value })
                break;
            default:
                this.setState({ 
                    sensorName: 'undefined',
                    dbName: 'undefined'
                 })
        }
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} onEscapeKeyDown={this.handleClose} aria-labelledby='dialog'>
                    <DialogTitle id='dialog-form-title'>Create a {this.state.type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill out the following information to setup a new graph.
                        </DialogContentText>
                        <StyledTextField
                            id='sensor-name'
                            required
                            label='Sensor Name'
                            margin='dense'
                            onChange={this.handleChange('sensor-name')}
                        />
                        <StyledSelectField
                            id='data-tag'
                            select
                            label='Data ID'
                            value={this.state.dataTag}
                            onChange={this.handleChange('data-tag')}
                            margin='dense'
                        >
                            {data_tags.map((selectOption, key) => (
                                <MenuItem key={'dtag' + key} value={selectOption}>
                                    {selectOption}
                                </MenuItem>
                            ))}
                        </StyledSelectField>
                        <br />
                        <StyledTextField
                            id='db-name'
                            required
                            label='Database Table Name'
                            margin='dense'
                            onChange={this.handleChange('db-name')}
                        />
                        <StyledSelectField
                            id='data-type'
                            select
                            label='Data Type'
                            value={this.state.dataType}
                            width={'50%'}
                            onChange={this.handleChange('data-type')}
                            margin='dense'
                        >
                            {data_types.map((selectOption, key) => (
                                <MenuItem key={'dtype' + key} value={selectOption}>
                                    {selectOption}
                                </MenuItem>
                            ))}
                        </StyledSelectField>
                    </DialogContent>
                    <DialogActions>
                                <Button onClick={this.handleClose} color='gray'>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} color='primary'>
                                    Create
                                </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                open={this.state.snackbarOpen}
                onClose={this.handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                >
                    <StyledSnackbar 
                        message={
                            <span className='snackbar_msg'>
                                <StyledInfo />
                                <SnackbarMsg>{msg}</SnackbarMsg>
                            </span>
                        }
                        action={[
                            <IconButton key='snackbar-close' aria-label='Close' color='inherit' onClick={this.handleSnackbarClose}>
                                <StyledClose />
                            </IconButton>
                        ]}
                    />
                </Snackbar>
            </div>
        )
    }
}

const StyledSelectField = withStyles({
    root: {
        width: '25%',
        marginLeft: 8,
        marginRight: 8
    }
})(TextField)

const StyledTextField = withStyles({
    root: {
        width: '50%',
        marginLeft: 8,
        marginRight: 8
    }
})(TextField)

const StyledSnackbar = withStyles({
    root: {
        backgroundColor: '#039BE5'
    },
    message: {
        color: 'white',
    }
})(SnackbarContent)

const StyledInfo = withStyles({
    opacity: 0.9,
    fontSize: 20,
})(InfoIcon)

const StyledClose= withStyles({
    fontSize: 20
})(CloseIcon)

const SnackbarMsg = styled.p`
    margin-left: 8px
`

export default DialogForm;