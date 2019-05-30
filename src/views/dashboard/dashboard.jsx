import React, { Component } from 'react';
//import styled from 'styled-components';
import Timeline from '../../components/widgets/timeline';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PieChart from '../../components/widgets/pie_chart';
import LineChart from '../../components/widgets/line_chart';
import Gauge from '../../components/widgets/gauge';



/*
const Content = styled.h1`
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-weight: 300;
    line-height: 1.5em;
    color: Black; 
`;*/

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper>
                          <Card>
                            <CardHeader
                              title="Machine Status"
                            />
                            <CardContent>
                              <Timeline />
                            </CardContent>
                          </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      <Paper>
                        <Card>
                          <CardContent>
                          <LineChart />
                          </CardContent>
                        </Card>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Paper>
                          <Card>
                            <CardHeader title='Live Current Data' />
                            <CardContent>
                              <Gauge />
                            </CardContent>
                          </Card>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>
                        <Card>
                          <CardHeader title='Machine workload %'/>
                          <CardContent style={{padding: '4px'}}>
                              <PieChart />
                          </CardContent>
                        </Card>
                      </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);