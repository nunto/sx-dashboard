import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
// Styles
import '../../assets/css/styles.css';


// UI Data
const data_tags = ['ai1', 'ai2', 'ai3', 'di1', 'di2', 'di3']
const data_types = ['Current', 'Pressure', 'Flow']
const msg = 'Please fill all required fields.'

// Secondary popup where users select where the chart data should come from
class DialogForm extends Component {
    state = {
        type: 'Timeline',
        open: false,
        sensorName: '',
        dbName: '',
        dataTag: data_tags[0],
        dataType: data_types[0],
        snackbarOpen: false
    }

    // Opens dialog, (gets called from popup.jsx)
    handleOpen = (type) => {
        this.setState({ 
            open: true,
            type: type
        })
    }

    // Handles a SQL data request
    handleSqlSubmit = () => {
        var { dbName, username, password, sensorName, dateField, runningState } = this.state;
        // Should definitely fix this if statement
        if ( dbName === '' || username === '' || password === '' || sensorName === '' || dateField === '' || runningState === '' ) {
            this.setState({ snackbarOpen: true })
        }
        else {
            this.props.onAddItem(this.state.type)
            this.setState({ 
                open: false,
                dbName: '',
                username: '',
                password: '', 
                sensorName: '',
                dateField: '',
                runningState: ''
            })
        }
    }

    // Handles an MQTT data request 
    handleMqttSubmit = () => {
        var { sensorName, topic, broker } = this.state;
        // Should fix this if statement too
        if ( sensorName === '' || topic === '' || broker === '' ) {
            this.setState({ snackbarOpen: true })
        } else {
            this.props.onAddItem(this.state.type)
            this.setState({ 
                open: false,
                sensorName: '',
                topic: '',
                broker: '',
                username: '',
                password: ''
             })
        }
    }

    // Called when closing the SQL dialog
    handleSqlClose = () => {
        this.setState({ 
            open: false,
            dbName: '',
            username: '',
            password: '', 
            sensorName: '',
            dateField: '',
            runningState: ''
        })
    }

    // Called when closing the MQTT dialog
    handleMqttClose = () => {
        this.setState({ 
            open: false,
            sensorName: '',
            topic: '',
            broker: '',
            username: '',
            password: ''
         })
    }

    // Called when snackbar is closed
    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false })
    }

    // Called on any SQL form value change
    handleSqlChange = (field) => (event) => {
        var val = event.target.value
        switch(field) {
            case 'db-name':
                this.setState({ dbName: val })
                break;
            case 'username':
                this.setState({ username: val })
                break;
            case 'password':
                this.setState({ password: val })
                break;
            case 'sensor-name':
                this.setState({ sensorName: val })
                break;
            case 'date':
                this.setState({ dateField: val })
                break;
            case 'running':
                this.setState({ runningState: val })
                break;
            default:
                this.setState({ 
                    sensorName: '',
                    dbName: ''
                 })
        }
    }

    // Called on any MQTT form value change
    handleMqttChange = (field) => (event) => {
        var val = event.target.value
        switch(field) {
            case 'sensor-name':
                console.log('sensor name updated')
                this.setState({ sensorName: val })
                break;
            case 'data-tag':
                this.setState({ dataTag: val })
                break;
            case 'topic':
                console.log('topic updated')
                this.setState({ topic: val })
                break;
            case 'data-type':
                this.setState({ dataType: val })
                break;
            case 'broker':
                this.setState({ broker: val })
                break;
            case 'username':
                this.setState({ username: val })
                break;
            case 'password':
                this.setState({ password: val })
                break;
            default:
                this.setState({ 
                    sensorName: '',
                    dbName: ''
                })
        }
    }

    render() {
        // Conditional rendering
        // Renders either the SQL or MQTT data request forms based on the value of dataType
        if (this.props.dataType) {
            return (
                <div>
                    <Dialog open={this.state.open} onClose={this.handleSqlClose} onEscapeKeyDown={this.handleSqlClose} aria-labelledby='dialog'>
                        <DialogTitle id='dialog-form-title'>Create a {this.state.type}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Fill out the following information to setup a new graph.
                        </DialogContentText>
                        <SectionHeading>
                            Database Configuration
                        </SectionHeading>
                        <Divider />
                        <StyledDBTextField
                            id='db-name'
                            fullWidth
                            required
                            label='Database Name'
                            margin='dense'
                            onChange={this.handleSqlChange('db-name')}
                        />
                        <StyledDBTextField
                            id='username'
                            required
                            label='Username'
                            margin='dense'
                            onChange={this.handleSqlChange('username')}
                        />
                        <StyledDBTextField
                            id='password'
                            type='password'
                            required
                            label='Password'
                            margin='dense'
                            onChange={this.handleSqlChange('password')}
                        />
                        <SectionHeading>
                            Select Fields
                        </SectionHeading>
                        <Divider />
                        <StyledDBTextField
                            id='sensor-name'
                            required
                            label='Sensor Name'
                            margin='dense'
                            onChange={this.handleSqlChange('sensor-name')}
                        />
                        <StyledDBTextField
                            id='date'
                            required
                            label='Date Column Name'
                            margin='dense'
                            onChange={this.handleSqlChange('date')}
                        />
                        <StyledDBTextField
                            id='running'
                            required
                            label='Sensor State Column Name'
                            margin='dense'
                            onChange={this.handleSqlChange('running')}
                        />
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={this.handleSqlClose}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSqlSubmit} color='primary'>
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
        } else {
            return (
                <div>
                    <Dialog open={this.state.open} onClose={this.handleMqttClose} onEscapeKeyDown={this.handleMqttClose} aria-labelledby='dialog'>
                        <DialogTitle id='dialog-form-title'>Create a {this.state.type}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Fill out the following information to setup a new graph.
                        </DialogContentText>
                        <StyledTextField
                            id='sensor-name'
                            required
                            label='Sensor ID'
                            margin='dense'
                            onChange={this.handleMqttChange('sensor-name')}
                        />
                        <StyledSelectField
                            id='data-tag'
                            select
                            label='Data ID'
                            value={this.state.dataTag}
                            onChange={this.handleMqttChange('data-tag')}
                            margin='dense'
                        >
                            {data_tags.map((selectOption, key) => (
                            <MenuItem key={'dtag' + key} value={selectOption}>
                                {selectOption}
                            </MenuItem>
                        ))}
                        </StyledSelectField>
                        <StyledTextField 
                            id='topic'
                            required
                            label='Topic'
                            margin='dense'
                            onChange={this.handleMqttChange('topic')}
                        />
                        <StyledSelectField
                            id='data-type'
                            select
                            label='Data Type'
                            value={this.state.dataType}
                            width={'50%'}
                            onChange={this.handleMqttChange('data-type')}
                            margin='dense'
                        >
                            {data_types.map((selectOption, key) => (
                                <MenuItem key={'dtype' + key} value={selectOption}>
                                    {selectOption}
                                </MenuItem>
                            ))}
                        </StyledSelectField>
                        <StyledDBTextField 
                            id='broker-address'
                            required
                            label='Broker Address'
                            margin='dense'
                            onChange={this.handleMqttChange('broker')}
                        />
                        <StyledDBTextField 
                            id='username'
                            label='Username'
                            margin='dense'
                            onChange={this.handleMqttChange('username')}
                        />
                        <StyledDBTextField
                            id='password'
                            type='password'
                            label='Password'
                            margin='dense'
                            onChange={this.handleMqttChange('password')}
                        />
                        </DialogContent>
                        <DialogActions>
                                <Button onClick={this.handleMqttClose}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleMqttSubmit} color='primary'>
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
}

const StyledSelectField = withStyles({
    root: {
        width: '25%',
        marginLeft: 8,
        marginRight: 8
    }
})(TextField);

const StyledTextField = withStyles({
    root: {
        width: '50%',
        marginLeft: 8,
        marginRight: 8
    }
})(TextField);

const StyledDBTextField = withStyles({
    root: {
        width: '75%',
        marginLeft: 8,
        marginRight: 8
    }
})(TextField);

const StyledSnackbar = withStyles({
    root: {
        backgroundColor: '#039BE5'
    },
    message: {
        color: 'white',
    }
})(SnackbarContent);

const StyledInfo = withStyles({
    root: {
    opacity: 0.8,
    fontSize: 20
    }
})(InfoIcon);

const StyledClose = withStyles({
    root: {
        fontSize: 20
    }
})(CloseIcon);

const SectionHeading = withStyles({
    root: {
        fontFamily: 'Roboto',
        marginTop: 24,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
})(DialogContentText);

const SnackbarMsg = styled.p`
    margin-left: 8px;
`;

export default DialogForm;