import React, { PureComponent } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
// Components
import Timeline from '../../components/widgets/timeline';
import PieChart from '../../components/widgets/pie_chart';
import LineChart from '../../components/widgets/line_chart';
import Gauge from '../../components/widgets/gauge';
import Popup from '../../components/popup/popup';
//Icons
import CloseIcon from '@material-ui/icons/Close';
// Styles
import '../../assets/css/styles.css';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';


// Responsive Grid Layout to render
const ResponsiveReactGridLayout = WidthProvider(Responsive);

var layouts = {};
var items = []


//items = getFromLS('items', 'item') || []
//items = JSON.parse(JSON.stringify(items))
/*
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
*/
/*var items = [{
    type: 'Timeline',
     w: 8,
     h: 3,
     x: 0,
     y: 0,
     minW: 6,
     minH: 3,
     maxH: 6,
     key: 0
},
{
    type: 'Line Chart',
    w: 4,
    h: 10,
    x: 9,
    y: 0,
    minW: 4, 
    minH: 6, 
    maxH: 12,
    key: 1
},
{
    type: 'Pie Chart',
    w: 4, 
    h: 4, 
    x: 0, 
    y: 7, 
    minW: 4, 
    minH: 4, 
    maxH: 12,
    key: 2
},
{
    type: 'Gauge',
    w: 2, 
    h: 3, 
    x: 5, 
    y: 7, 
    minW: 2, 
    minH: 2, 
    maxH: 12,
    key: 3
}]
*/
class Dashboard extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            layouts: layouts,
            counter: 999,
            items: items,
            anchorEl: null,
        };
        this.onAddItem = this.onAddItem.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        await getFromSQL(124234)
        .then(result => {
            layouts = JSON.parse(result.layout);
            items = JSON.parse(result.items);

            if (result.layout === null || result.items === null) {
                console.log('From LS')

                layouts = getFromLS('layouts', 'layout') || {};
                layouts = JSON.parse(JSON.stringify(layouts))

                items = getFromLS('items', 'item') || []
                items = JSON.parse(JSON.stringify(items))
            }
            
            var count = getMaxKey(items);
            this.setState({ counter: count })

            // Null checks
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
            this.setState({ 
                layouts: layouts,
                items: items
             })
        })
    }

    static get defaultProps() {
        return {
            className: 'layout',
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 30

        };
    }
    
    // Create a chart
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
    
    // Create grid settings for the layout
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
    
    // Remove an item from the dashboard
    onRemoveItem(key) {
        console.log("removing", key);
        this.setState({ items: _.reject(this.state.items, { key: key }) });
    }

    // Reset the saved layout
    resetLayout = () => {
        this.setState({ layouts: {} });
    }

    // Send Layout and Items to SQL
    saveToSQL = () => {
        var layouts = getFromLS('layouts', 'layout') || '';
        var items = getFromLS('items', 'item') || ''
        var insertData = {
            client_id: 124234,
            layout: JSON.stringify(layouts),
            items: JSON.stringify(items)
        }
        console.log(insertData)
        console.log(JSON.stringify(insertData))
        if (layouts !== '' && items !== '') {
            fetch('http://localhost:8080/insert', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(insertData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            alert("Error saving")
        }
    }

    // Called when any element is moved or a new one added
    onLayoutChange(layout, layouts) {
        var width = window.innerWidth;
        // Calculate the current breakpoint
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

        // Set the items array to have the same layout as currently on screen
        // for that specific breakpoint
        var items = this.state.items
        if (layouts[bp] !== undefined && items !== undefined) {
        for (var i = 0; i < items.length; i++) {
            if (layouts[bp][i] !== undefined) {
            items[i]['w'] = layouts[bp][i]['w'];
            items[i]['h'] = layouts[bp][i]['h'];
            items[i]['x'] = layouts[bp][i]['x'];
            items[i]['y'] = layouts[bp][i]['y'];
            }
        }
    }
        // Save data to LS
        saveToLS('items', items, 'item');
        saveToLS('layouts', layouts, 'layout');
        this.setState({ layouts });
        this.setState({ items: items })
    }

    render() {
        return(
            <div>
                <span>
                    <Popup onAddItem={this.onAddItem} onSave={this.saveToSQL}/>
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

async function getFromSQL (id = 0) {
    var selectField = {
        client_id: id
    }

    var layout = null
    var items = null

    await fetch('http://localhost:8080/select', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(selectField),
    })
    .then(res => res.json())
    .then(resJson => {
        if (resJson != null) {
            layout = resJson[0].Layout
            items = resJson[0].Items
        }
        
    })
    console.log("layout, items: ", layout, items)
    var result = {
        layout: layout,
        items: items
    }
    return result;
}

function getMaxKey(items) {
    var maxKey = -1;
    items.forEach((el) => {
        if (el.key > maxKey) {
            maxKey = el.key
        }
    })
    maxKey += 1;
    return maxKey;
}


// Get data from localstorage
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
 
// Save data to localstorage
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