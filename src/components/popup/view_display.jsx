import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

/*
    When creating a chart through SQL, this Dialog gets displayed showing all the data from whichever
    table they specified. They would then select a column and hit create. Currently, the logic behind this
    popup has not been implemented as we weren't too sure what we'd need displayed. 

    The fetch should be changed to a post with the body being the selected column(s). The API would need to be changed too.
*/
class ViewDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            tabContent: [],
            headers: []
        }
    }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/get-view')
        .then(res => res.json())
        .then(resJson => {
            var headers = resJson.Cols;
            var rows = resJson.Rows;
            var content = [];

            for (let i = 0; i < headers.length; i++) {
                content.push([]);
            }

            console.log("Rows: ")
            console.log(rows)
            console.log(rows[0])

            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].length; j++) {
                    console.log(rows[i][j])
                    content[j].push(rows[i][j]);
                }
            }
            this.setState({ 
                tabContent: content,
                headers: headers
            })
        })
    }

    createTabContent = () => {
        var content = [];
        
        // Empty 2D Array
        for (let i = 0; i < this.props.headers.length; i++) {
            content.push([]);
        }

        for (let row in this.props.rows) {
            for (let i = 0; i < row.length; i++) {
                content[i].length(row[i]);
            }
        }

        // Use this to map out the tab containers 
        return content;
    }

    getContainer(value) {
        let data = this.state.tabContent[value]
        console.log("Data: ")
        console.log(data)
        if (data !== undefined) {
            return (
                <div>
                {data.map((el, key) => (
                    <Typography key={key}>{el}</Typography>
                ))}
                </div>
            );
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    }

    render() {
        const { headers, value } = this.state;
        return (
            <Dialog open={this.props.open} onClose={this.props.handleTableToggle} 
            onEscapeKeyDown={this.props.handleTableToggle} aria-labelledby='table' fullScreen>
                <DialogTitle>
                    <AppBar position='static'>
                        <Tabs value={value} onChange={this.handleChange} variant="scrollable"
                        scrollButtons="on">
                            {headers.map((header, index) => (
                                <Tab value={index} label={header}/>
                            ))}
                        </Tabs>
                    </AppBar>
                    </DialogTitle>
                    <DialogContent>
                    {this.getContainer(value)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleTableToggle}>
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleTableToggle} color='primary'>
                        Select
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ViewDisplay;