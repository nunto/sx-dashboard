import React, { Component } from 'react';
import Chart from 'react-google-charts';


class LineChart extends Component {
    constructor(props) {
    super(props);
    this.state = {
      width: '30vw',
    }
    this.updateWidth = this.updateWidth.bind(this)
    }
     updateWidth() {
        if (window.innerWidth >= 1280 ) {
      this.setState({ width: '30vw' })
      console.log('large window - resizing to 30vw')
      
        } else {
      this.setState({ width: '70vw' })
      console.log('small window - resizing to 70vw')
        }
    }

    componentDidMount() {
    this.updateWidth()
    window.addEventListener("resize", this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }
    render() {
        return ( 
            <Chart
                key={'key' + this.state.width}
                width={this.state.width}
                height={'400px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                    'Hour',
                    'Machine A',
                    'Machine B',
                    'Machine C',
                    'Machine D',
                    ],
                    [8, 90, 80.8, 75.6, 70.1],
                    [9, 91.3, 82.4, 79.4, 71.0],
                    [10, 89.4, 81.5, 0.0, 74.3],
                    [11, 25.4, 54.0, 0.0, 73.2],
                    [12, 32.5, 78.4, 65.4, 78.4],
                    [13, 90.5, 84.3, 79.4, 76.0],
                    [14, 91.5, 88.5, 83.5, 71.7],
                    [15, 93.1, 91.2, 86.9, 80.4],
                    [16, 90.9, 87.7, 85.4, 82.2],
                    [17, 92.4, 90.4, 89.9, 79.1],
                ]}
                options={{
                    chart: {
                    title: 'Machine Operating Efficiency',
                    subtitle: 'in %',
                    },
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        );
    }
}

export default LineChart;