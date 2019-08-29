import React, { Component } from 'react';
import Chart from 'react-google-charts';
// Styles
import '../../assets/css/charts.css';


/* 
    Timeline chart to show when the machine was running/off. 
    This chart uses data fetched from SQL. It also shows how to customize tooltips & colours.
*/
class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '70vw',
            //height: '500px',
            options: {
                timeline: { showBarLabels: false },
                hAxis: {
                    format: 'h:mm a'
                },
                allowHtml: true,
                isHtml: true,
                colors: ['#54ff8f', '#ff5454'],
                avoidOverlappingGridLines: false,
            }
        }
    }
    
    componentDidMount() {
        // Grab data when component mounts
        this.getData();
    }

    // Calculate the duration in hours:mins between 2 dates
    getDuration = (d1, d2) => {
        var d3 = new Date(d2 - d1);
        var d0 = new Date(0);

        return {
            getHours: function(){
                //return d2.getHours() - d1.getHours();
                return d3.getHours() - d0.getHours();
            },
            getMinutes: function(){
                //return d2.getMinutes() - d1.getMinutes();
                return d3.getMinutes() - d0.getMinutes();
            },
            toString: function(){
                var h = this.getHours().toString();
                var m = this.getMinutes().toString();

                if (h === '0') {
                    return m + " minutes";
                }

                if (m.length === 1) {
                    m = '0' + m;
                }

                return h + ":" + m + " hours";
            },
        };
    }

    // Get data from api created in go
    async getData() {
        //await fetch('http://172.18.19.97:8080/api/timeline')
        await fetch('http://localhost:64426/api/WidgetConstructor/Timeline', {
            headers: {
                'Authorization': 'Bearer ooD9WC1_msIxwDvQYLNjYXIBotZhhzEjeOkWS_DkIXQE_mIjG15EMhi8TvvgnpnQbxWuNTKH1cX2HasseEdYxsJ7qD-JTJ54SBSnY7CTpkfRt9-TlFTlYLflIngu3U65JrD_Cyd_ezMfxMWikJR6ursA8qEX-3puJx6rrHMf0BxLDFwOliP5Pnn4-CkgkoVaXPiXay_OWP0HORRHNkbbViutSbiajF7RH8QJ1roaOfI_XWsyqq7s_rBvWTEFHu1ytfWERhGHIhntw6xzmbPnQhdIxUgU3G3VGPecPujrGnU',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.json())
        .then((resJson) => {
            // Set up the chart data
            var data = [
            [
                { type: 'string', id: 'Position' },
                { type: 'string', id: 'dummy bar label' },
                { type: 'string', label: 'test', role: 'tooltip', p: { html: true } },
                { type: 'date', id: 'Start' },
                { type: 'date', id: 'End' }
            ],]

            for (var i = 0; i < resJson.length; i++) {
                var status = 'DOWN'
                var name = resJson[i].Name
                var startDate = new Date(new Date(resJson[i].ElementDate).toUTCString().split(' ').slice(0, 5).join(' '))
                var endDate = startDate;
                if (i + 1 < resJson.length) {
                    endDate = new Date(new Date(resJson[i + 1].ElementDate).toUTCString().split(' ').slice(0, 5).join(' '));
                }

                if (resJson[i].Status === 1) {
                    status = 'RUNNING'
                }

                var newTaskElement = [
                    name,
                    status,
                    `<div><strong class="strong_text">${name}</strong></div><hr><div>
                    <p><strong class="strong_text">Task ${status}: </strong>${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}</p>
                    <p><strong class="strong_text">Duration: </strong>${this.getDuration(startDate, endDate)}</p></div>`,
                    startDate,
                    endDate
                ]
                data.push(newTaskElement)
            }
            this.setState({ data: data })
        })
    }

    render() {
        const { data, options } = this.state
        return (
            <Chart
                width={'100%'}
                height={'100%'}
                chartType='Timeline'
                loader={<div>Loading Chart</div>}
                options={options}
                data={data}
            />
        )
    }
}

export default Timeline;