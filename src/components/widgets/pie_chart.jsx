import React, { Component } from 'react';
import Chart from 'react-google-charts';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '30vw',
      chartWrapper: null
    }
    this.updateWidth = this.updateWidth.bind(this)
  }
  updateWidth() {
    if (window.innerWidth >= 1280 ) {
      this.setState({ width: '30vw' })
      console.log('large window - resizing to 40vw')
      
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
        <div>
          <Chart
            key={'size' + this.state.width}
            width={this.state.width}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Machine', 'Task Assignments'],
              ['Machine A', 49],
              ['Machine B', 31],
              ['Machine C', 25],
              ['Machine D', 41]
            ]}
            //options={{
              //title: 'Task Assignment Locations'
            //}}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
      )
}
}

export default PieChart;