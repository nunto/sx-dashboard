import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// eslint-disable-next-line
const Content = styled.h1`
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-weight: 300;
    line-height: 1.5em;
    color: Black; 
`;

// Sample devices page

class Devices extends Component {
  render() {
      const { classes } = this.props;
      return (
      <div className={classes.root}>
          <ExpansionPanel>
              <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
                  <Typography className={classes.heading}>Device 1</Typography>
                  <Typography className={classes.secondaryHeading}>Advantech connected at _______</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              < Typography>
              Device details
              </Typography>
              </ExpansionPanelDetails>
          </ExpansionPanel>
      </div>
      )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

Devices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Devices);