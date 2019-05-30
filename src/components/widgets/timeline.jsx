import React, { Component } from 'react';
import Chart from 'react-google-charts';

import '../../assets/css/charts.css';


class Timeline extends Component {
    componentDidMount() {
        this.getData();
    }

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

    async getData() {
        await fetch('http://172.18.19.97:8080/api/timeline')
        .then((res) => res.json())
        .then((resJson) => {
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

    render() {
        const { data, options } = this.state
        return (
            <Chart
                width={this.state.width}
                chartType='Timeline'
                loader={<div>Loading Chart</div>}
                options={options}
                data={data}
            />
        )
    }
}

export default Timeline;