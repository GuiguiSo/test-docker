import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import JoinButton from "./JoinButton";
import DeleteParticipantActivityGroup from './DeleteParticipantActivityGroup';
import DeleteActivityGroup from "./DeleteActivityGroup";
import MapContainer from "../googleMap/MapContainer";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

// Redux stuff
import { connect } from "react-redux";
import { getActivityGroup, clearErrors, kickParticipant } from "../../redux/actions/dataActions";


const styles = (theme) => ({
  ...theme.spreadIt,
  profileImage: {
    maxWidth: 125,
    height: 125,
    borderRadius: "5%",
    objectFit: "cover",
  },
  status: {
    danger: "#e53e3e",
  },
  memberGroupImage: {
    maxWidth: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  DeleteMemberButton: {
    left: -8,
    top: 20,
  },
  expandButton: {
    position: "absolute",
    left: "93%",
  },
  addGroupButton: {},
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  fap: {
    margin: 1,
  },
  test: {
    overflowY: 'visible',
  },

});

class ActivityGroupDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, activityGroupId } = this.props;
    const newPath = `/users/${userHandle}/activityGroup/${activityGroupId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getActivityGroup(this.props.activityGroupId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  papouetKick = (userHandle) => {
    this.props.kickParticipant(this.props.activityGroupId, userHandle)
    this.props.handleClose()
  }

  render() {
    const {
      classes,
      activityGroup: {
        activityGroupId,
        title,
        body,
        createdAt,
        finishedAt,
        commentCount,
        userImage,
        userHandle,
        comments,
        memberLimit,
        participantCount,
        activityGroupParticipants,
        activityImage,

      },
      user: {
        authenticated,
        credentials: { handle },
      },
      UI: { loading },
    } = this.props;
    const finishedDate = new Date(finishedAt);
    const newDate = new Date(finishedDate.getTime() - 7200000);
    let listParticipant;
    let classNameHolder = ["default", "primary", "secondary"];
    let joinB;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteActivityGroup activityGroupId={activityGroupId} activityGroup={this.props.activityGroup} />
      ) : null;
    

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Fragment >
        <Grid container spacing={15}>
          <Grid item sm={3}>
            <img
              src={activityImage}
              alt="Profile"
              className={classes.profileImage}
            />
          </Grid>
          <Grid item sm={8}>
          <div style={{ wordWrap: 'break-word' , whiteSpace: "pre-line" }} > 
            <Typography variant="h6" color='secondary'>
              {title}
            </Typography>
            </div>
            
            <Typography variant="body2" color="textSecondary">
              {newDate.toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            {deleteButton}
            <Typography
              component={Link}
              color="primary"
              variant="body2"
              to={`/users/${userHandle}`}
             >
              @{userHandle}
            </Typography>
            <div style={{ wordWrap: 'break-word' , whiteSpace: "pre-line" }} > 
            <Typography variant="body1">{body}</Typography>
            </div>
          </Grid>
          <Grid item spacing={11}>
            <JoinButton
              activityGroup={this.props.activityGroup}
              participantCount={participantCount}
              memberLimit={memberLimit}
            />
            <span>
              {participantCount}/{memberLimit}
            </span>

            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount}</span>
          </Grid>
          
          <Grid  container>
              {activityGroupParticipants
                ? activityGroupParticipants.map((activityGroupParticipant) => {
                    return (
                      <Grid >
                        <Tooltip
                          title={`@${activityGroupParticipant.userHandle}`}
                          variant="body1"
                          component={Link}
                          to={`/users/${activityGroupParticipant.userHandle}`}
                          color="primary"
                          aria-label="add"
                        >
                          <Fab
                            color={classNameHolder[Math.floor(Math.random() * 3)]}
                            className={classes.fap}
                          >
                            <img
                              src={activityGroupParticipant.userImage}
                              alt="Profile"
                              className={classes.memberGroupImage}
                            />
                          </Fab>
                        </Tooltip>
                           {authenticated && userHandle === handle ? (
                            <DeleteParticipantActivityGroup activityGroupParticipant={activityGroupParticipant} className={classes.DeleteMemberButton}/>
                        ) : null}
                     </Grid>
                    );
                    
                  })
                : ""}
          </Grid>
          <hr className={classes.visibleSeparator} />

          <hr className={classes.visibleSeparator} />

          <CommentForm activityGroupId={activityGroupId} />
          <Comments comments={comments} />
        </Grid>
      </Fragment>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand activityGroup"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}

          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ActivityGroupDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getActivityGroup: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  activityGroupId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  activityGroup: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  activityGroup: state.data.activityGroup,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  getActivityGroup,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ActivityGroupDialog));