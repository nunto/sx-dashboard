import React, { Component } from 'react';
import Chart from 'react-google-charts';


// Websocket to retrieve MQTT data
// Switch this to the C# API version
const ws = new WebSocket('ws://localhost:8080/current');

// Gauge Chart
class Gauge extends Component {
    state = {
        data: 0.0,
        options: {
            redFrom: 8,
            redTo: 10,
            yellowFrom: 6,
            yellowTo: 8,
            greenFrom: 0,
            greenTo: 6,
            max: 10,
            min: 0,
            minorTicks: 2,
            majorTicks: ['0', '1', '2', '3', '4', '5', '6', '7','8','9','10']
        }
    }

    // Set a listener for ws data
    componentDidMount() {
        ws.onmessage = function(e) {
            console.log('Websocket msg received: ' +  e.data);
            var f = parseFloat(e.data)
            f = (f * 1.25) - 5
            this.setState({ data: f })
        }.bind(this)
    }

    componentWillUnmount() {
        ws.close(1000)
    }

    render() {
        const { data, options } = this.state;
        return (
            <Chart
                width={'100%'}
                height={'100%'}
                chartType='Gauge'
                loader={<div>Loading Chart</div>}
                data={[
                    ['Label', 'Value'],
                    ['Current', data]
                ]}
                options={options}
            />
        )
    }
}

export default Gauge;