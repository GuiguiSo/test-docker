import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { connect } from 'react-redux';
import { kickParticipant } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class DeleteParticipantActivityGroup extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleKick = () => {
    let activityGroupParticipant = this.props.activityGroupParticipant
    this.props.kickParticipant(activityGroupParticipant.activityGroupId, activityGroupParticipant.userHandle)
    this.handleClose()
  };
  render() {
    const { classes, activityGroupParticipant } = this.props
    console.log(this.props)
    return (
      <Fragment>
        <MyButton
          tip={"Kick "+ activityGroupParticipant.userHandle}
          onClick={this.handleOpen}
          className={classes.DeleteMemberButton}
        >
          <HighlightOffIcon color="secondary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to KICK?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleKick} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteParticipantActivityGroup.propTypes = {
    kickParticipant: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    activityGroupId: PropTypes.string.isRequired
};

export default connect(
  null,
  { kickParticipant }
)(withStyles(styles)(DeleteParticipantActivityGroup));
