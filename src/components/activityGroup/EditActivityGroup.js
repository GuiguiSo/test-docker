import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import DeleteActivityGroup from "./DeleteActivityGroup";
// Redux stuff
import { connect } from "react-redux";
import { editActivityGroupDetails } from "../../redux/actions/dataActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import LocationSearchInput from "../googleMap/LocationSearchInput";


const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: "right",
  },
  editActivityGroupButton: {
    position: "absolute",
    left: "93%",
    top: "10%",
  },
});

class EditActivityGroup extends Component {
  constructor(props) {
    super(props);
    this.parentmethod = this.parentmethod.bind(this);
    this.state = {
      address: "",
      lat: "",
      lng: "",
      title: "",
      body: "",
      memberLimit: "",
      finishedAt: "",
      location: "",
      open: false,
      error: {},
    };
  }

  state = {
    title: "",
    body: "",
    memberLimit: "",
    finishedAt: "",
    location: "",
    open: false,
    error: {},

  };
  
  parentmethod(address, lat, lng) {
    this.setState({
      address: address,
      lng: lng,
      lat: lat,
    });
  }

  mapUserDetailsToState = (activityGroup) => {
    this.setState({
      title: activityGroup.title,
      body: activityGroup.body,
      memberLimit: activityGroup.memberLimit,
      finishedAt: activityGroup.finishedAt,
      location: activityGroup.location,
      lat: activityGroup.lat,
      lng: activityGroup.lng
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.activityGroup);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.mapUserDetailsToState(this.props.activityGroup);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  handleSubmit = () => {
    const activityGroupDetails = {
      activityGroupId: this.props.activityGroupId,
      title: this.state.title,
      body: this.state.body,
      memberLimit: this.state.memberLimit,
      finishedAt: this.state.finishedAt,
      location: this.state.address,
      handle: this.props.activityGroup.userHandle,
      lat: this.state.lat,
      lng: this.state.lng,
    };
    this.props.editActivityGroupDetails(activityGroupDetails);
    this.handleClose();
  };
  
  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const finishedAtFormat = this.state.finishedAt.slice(0,22);
    let classNameHolder = ["default", "primary", "secondary"];
    const characterLimitTitle = 25;
    const characterLimitBody = 500;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.editActivityGroupButton}
        >
          <EditIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                variant="outlined"
                name="title"
                type="text"
                label="Titre"
                multiline
                rows="3"
                inputProps={{
                  maxlength: characterLimitTitle
                }}
                placeholder=""
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                name="body"
                type="text"
                label="Description"
                multiline
                rows="3"
                inputProps={{
                  maxlength: characterLimitBody
                }}
                placeholder=""
                className={classes.textField}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                name="memberLimit"
                type="number"
                label="Nombre de participant"
                className={classes.textField}
                value={this.state.memberLimit}
                onChange={this.handleChange}
                InputProps={{ inputProps: { min: 2, max: 50 } }}
                fullWidth
              />
              <LocationSearchInput address={this.state.location} methodfromparent={this.parentmethod} />
              <TextField
                name="finishedAt"
                label="Date de l'activité"
                type="datetime-local"
                variant="outlined"
                className={classes.textField}
                defaultValue={finishedAtFormat}
                InputLabelProps={{ shrink: true }}
                onChange={this.handleChange}
              />
            </form>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditActivityGroup.propTypes = {
  editActivityGroupDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  activityGroupId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  user: state.user,
});

export default connect(mapStateToProps, { editActivityGroupDetails })(
  withStyles(styles)(EditActivityGroup)
);
