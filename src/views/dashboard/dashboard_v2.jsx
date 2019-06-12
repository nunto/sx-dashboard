import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout'; 
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

// Widgets
import Timeline from '../../components/widgets/timeline';
import PieChart from '../../components/widgets/pie_chart';
import LineChart from '../../components/widgets/line_chart';
import Gauge from '../../components/widgets/gauge';
import Popup from '../../components/popup/popup';

// Styles
import '../../assets/css/styles.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts', 'layout') || {};
console.log('orig layouts: ' + originalLayouts)

const originalItems = getFromLS('items', 'item') || 'noItems'
console.log('orig items: ' + originalItems);

const initial =  [{
                type: 'Timeline',
                 w: 8, 
                 h: 3, 
                 x: 0, 
                 y: 0, 
                 minW: 6, 
                 minH: 3, 
                 maxH: 6
            },
            {
                type: 'Line Chart',
                w: 4, 
                h: 10, 
                x: 9, 
                y: 0, 
                minW: 4, 
                minH: 6, 
                maxH: 12
            },
            {
                type: 'Pie Chart',
                w: 4, 
                h: 4, 
                x: 0, 
                y: 7, 
                minW: 4, 
                minH: 4, 
                maxH: 12
            },
            {
                type: 'Gauge',
                w: 2, 
                h: 3, 
                x: 5, 
                y: 7, 
                minW: 2, 
                minH: 2, 
                maxH: 12
            }]

var items = JSON.parse(JSON.stringify(originalItems))
console.log(items)

if (originalItems === 'noItems') {
items = initial.map(function(el, key, list) {
    return {
        type: el.type,
        w: el.w,
        h: el.h,
        x: el.x,
        y: el.y,
        minW: el.minW,
        minH: el.minH,
        maxH: el.maxH,
        key: key
    }
})
}

const initialCounter = items.length + 1;

items.forEach((el) => {
    if (el.x === null) {
        el.x = Infinity       
    }
    if (el.y === null) {
        el.y = Infinity 
    }
    if (el.w === null) {
        el.w = 1
    }
    if (el.h === null) {
        el.h = 1
    }
})

console.log('items=> ' + items);

class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
            counter: initialCounter,
            items: items,
            anchorEl: null,
        };
        this.onAddItem = this.onAddItem.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    static get defaultProps() {
        return {
            className: 'layout',
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 30

        };
    }
    
    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        if (el.type === 'Timeline') {
            return(
                <div key={el.key} data-grid={el}>
                    <div className='graph_paper'>
                        <Timeline />
                    </div>
                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={this.onRemoveItem.bind(this, el.key)}
                        >
                        <CloseIcon />
                    </span>
                </div>
            )
        } else if (el.type === 'Line Chart') {
            return(
                <div key={el.key} data-grid={el}>
                    <div className='graph_paper'>
                        <LineChart />
                    </div>
                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={this.onRemoveItem.bind(this, el.key)}
                        >
                        <CloseIcon />
                    </span>
                    </div>
            )
        } else if (el.type === 'Pie Chart') {
            return(
                <div key={el.key} data-grid={el}>
                    <div className='graph_paper'>
                        <PieChart />
                    </div>
                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={this.onRemoveItem.bind(this, el.key)}
                        >
                        <CloseIcon />
                    </span>
                </div>
            )
        }
        return(
            <div key={el.key} data-grid={el}>
                <div className='graph_paper'>
                    <Gauge />
                </div>
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={this.onRemoveItem.bind(this, el.key)}
                    >
                    <CloseIcon />
                </span>
            </div>
        )
        }
    
    onAddItem(type) {
        var w, h, minW, minH, maxH = 4;
        switch(type) {
            case 'Timeline':
                w = 8; h = 3; minW = 6; minH = 3; maxH = 6;
                break;
            case 'Line Chart':
                w = 4; h = 10; minW = 4; minH = 6; maxH = 12;
                break;
            case 'Pie Chart':
                w = 4; h = 4; minW = 4; minH = 4; maxH = 12;
                break;
            case 'Gauge':
                w = 2; h = 3; minW = 2; minH = 2; maxH = 12;
                break;
            default:
                w = 4; h = 4; minW = 3; minH = 3; maxH = 12;
        }
        var newWidget = {
            type: type,
            x: (this.state.items.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: w,
            h: h,
            minW: minW,
            minH: minH,
            maxH: maxH,
            key: this.state.counter
        }
        this.setState({
        items: this.state.items.concat(newWidget),
        counter: this.state.counter + 1
        });
    }
    
    onRemoveItem(key) {
        console.log("removing", key);
        this.setState({ items: _.reject(this.state.items, { key: key }) });
    }

    resetLayout() {
        this.setState({ layouts: {} });
    }

    onLayoutChange(layout, layouts) {
        var width = window.innerWidth;
        var bp = 'sm'
        if (width >= 1200) {
            bp = 'lg'
        } else if (width >= 996) {
            bp = 'md'
        } else if (width >= 768) {
            bp = 'sm'
        } else if (width >= 480) {
            bp = 'xs'
        } else {
            bp = 'xxs'
        }

        console.log(this.state.items)

        var items = this.state.items
        if (layouts[bp] !== undefined && items !== undefined) {
        for (var i = 0; i < items.length; i++) {
            items[i]['w'] = layouts[bp][i]['w'];
            items[i]['h'] = layouts[bp][i]['h'];
            items[i]['x'] = layouts[bp][i]['x'];
            items[i]['y'] = layouts[bp][i]['y'];
        }
    }

        saveToLS('items', items, 'item');
        saveToLS('layouts', layouts, 'layout');
        this.setState({ layouts });
        this.setState({ items: items })
    }

    saveItems() {
        saveToLS('items', this.state.items)
    }

    render() {

        return(
            <div>
                <span>
                <Button variant="outlined" color="primary" onClick={() => console.log(this.state.items)}>
                    Reset
                </Button>
                <Button variant="outlined" color="primary" onClick={() => this.saveItems()}>
                    Save
                </Button>
                <Popup onAddItem={this.onAddItem}/>
                </span>
                <ResponsiveReactGridLayout
                    className='layout'
                    cols={{ lg: 12, md: 10, sm: 6, xs: 2, xxs: 2 }}
                    rowHeight={30}
                    layouts={this.state.layouts}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
                    {...this.props}
                >
                    {_.map(this.state.items, el => this.createElement(el))}
                </ResponsiveReactGridLayout>
            </div>
        )
    }

}


function getFromLS(key, type) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem(type)) || {};
        } catch(e) {
            /*Ignore*/
            console.log(e);
        }
    }
    return ls[key];
}

function saveToLS(key, value, type) {
    if (global.localStorage) {
        global.localStorage.setItem(
            type,
            JSON.stringify({
                [key]: value
            })
        )
    }
}

export default Dashboard;