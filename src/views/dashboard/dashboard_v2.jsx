import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { sizing } from '@material-ui/system' 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import theme from '../../theme/theme';

// Widgets
import Timeline from '../../components/widgets/timeline';
import PieChart from '../../components/widgets/pie_chart';
import LineChart from '../../components/widgets/line_chart';
import Gauge from '../../components/widgets/gauge';

// Styles
import '../../assets/css/styles.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};


class Dashboard extends PureComponent {
    constructor(props) {
        super(props);

        this.state={
            layouts: JSON.parse(JSON.stringify(originalLayouts))
        };
    }

    static get defaultProps() {
        return {
            className: 'layout',
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 1200

        };
    }

    resetLayout() {
        this.setState({ layouts: {} });
    }

    onLayoutChange(layout, layouts) {
        saveToLS('layouts', layouts);
        this.setState({ layouts });
    }

    refreshPage() {
        window.location.reload();
    }

    render() {
        return(
            <div>
                <span>
                <Button variant="outlined" color="primary" onClick={() => this.resetLayout()}>
                    Reset
                </Button>
                <Button variant="outlined" color="primary" onClick={() => this.refreshPage()}>
                    Save
                </Button>
                </span>
                <ResponsiveReactGridLayout
                    className='layout'
                    cols={{ lg: 12, md: 10, sm: 6, xs: 2, xxs: 2 }}
                    rowHeight={30}
                    layouts={this.state.layouts}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
                    //preventCollision={true}
                    //verticalCompact={false}
                >
                    <div key='1' data-grid={{ w: 8, h: 3, x: 0, y: 0, minW: 6, minH: 3, maxH: 6 }}>
                        <div className='graph_paper'>
                        <Timeline />
                        </div>
                    </div>
                    <div key='2' data-grid={{ w: 4, h: 10, x: 9, y: 0, minW: 4, minH: 6, maxH: 12}}>
                        <div className='graph_paper'>
                        <LineChart />
                        </div>
                    </div>
                    <div key ='3' data-grid={{ w: 4, h: 4, x: 0, y: 7, minW: 4, minH: 4, maxH: 12 }}>
                        <div className='graph_paper'>
                        <PieChart />
                        </div>
                    </div>
                    <div key ='4' data-grid={{ w: 2, h: 3, x: 5, y: 7, minW: 2, minH: 2, maxH: 12 }}>
                        <div className='graph_paper'>
                            <Gauge />
                        </div>
                    </div>
                </ResponsiveReactGridLayout>
            </div>
        )
    }

}


function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
        } catch(e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            'rgl-8',
            JSON.stringify({
                [key]: value
            })
        )
    }
}

export default Dashboard;