import React, { Component } from 'react';
import _ from 'lodash';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// Styles
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

/*
    NOT USED ANYMORE -- 
*/
class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            headers: 'Chart couldn\'t be loaded',
            selectedCol: 'nil'
        }
    }

    handleSelection = (colName) => {
        this.setState({ selectedCol: colName })
    }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/get-view')
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson)
            console.log(resJson.Rows)
            var headers = [];
            var data = [];
            for (var i = 0; i < resJson.Cols.length; i++) {
                headers.push({
                    dataField: resJson.Cols[i],
                    text: resJson.Cols[i],
                    headerEvents: {
                        onClick: this.handleSelection(resJson.Cols[i])
                    }
                })
            }
            
            for (i = 0; i < resJson.Rows.length; i++) {
                data.push(_.zipObject(resJson.Cols, resJson.Rows[i]))
                console.log(data)
            }

            console.log('rows:')
            console.log(data)
            console.log('headers:')
            console.log(headers)
            this.setState({ 
                headers: headers,
                rows: data
             })
        })
    }  

    render() {
        const { headers, rows } = this.state;
        return (
            <Dialog open={this.props.open} onClose={this.props.handleTableToggle} onEscapeKeyDown={this.props.handleTableToggle} aria-labelledby='table'>
                <DialogTitle id='table-dialog-title'>Select widget data</DialogTitle>
                <DialogContent>
                    <DialogContentText>Select a column to create a widget from.</DialogContentText>
                    <BootstrapTable keyField='MessageDate' data={rows} columns={headers} />
                </DialogContent>
            </Dialog>
        )
    }
}

export default DataTable;