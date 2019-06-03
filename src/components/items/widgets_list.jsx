import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';

const styles = theme => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
})


class Widgets extends Component {
    
    render() {
        const { classes, style, onAddItem } = this.props;

        return (
            <div className={classes.root}>
                <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
                    <ListItem button style={style} key={'timeline'} onClick={() => onAddItem('timeline')}>
                        <ListItemText primary='Timeline' />
                    </ListItem>
                    <ListItem button style={style} key={'line'} onClick={onAddItem('line')}>
                        <ListItemText primary='Line Chart' />
                    </ListItem>
                    <ListItem button style={style} key={'pie'} onClick={onAddItem('pie')}>
                        <ListItemText primary='Pie Chart' />
                    </ListItem>
                    <ListItem button style={style} key={'gauge'} onClick={onAddItem('gauge')}>
                        <ListItemText primary='Gauge' />
                    </ListItem>
            </FixedSizeList>
            </div>
        );
    }
}

Widgets.propTypes = {   
  style: PropTypes.object.isRequired,
};



export default withStyles(styles)(Widgets);