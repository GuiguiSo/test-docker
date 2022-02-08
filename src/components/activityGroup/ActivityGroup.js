import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import DeleteActivityGroup from "./DeleteActivityGroup";
import ActivityGroupDialog from "./ActivityGroupDialog";
import EditActivityGroup from "./EditActivityGroup";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import red from '@material-ui/core/colors/red';
// Icons
// Redux
import { connect } from "react-redux";
const accent = red[500];
const styles = (theme) => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },

});


class ActivityGroup extends Component {
  renderSwitch(tag){
    let colorTag = ""
    switch(tag){
      case "Jeux":
          colorTag = "#311b92"  
          return colorTag
      case "Aquatique": 
          colorTag = "#1976d2"  
          return colorTag
        case "Bowling":
          colorTag = "#004d40"  
          return colorTag 
        case "Art":
          colorTag = "#880e4f"  
          return colorTag 
        case "Pleine air":
          colorTag = "#2e7d32"  
          return colorTag 
        case "Sport":
          colorTag = "#aeea00"  
          return colorTag 
        case "Arcade":
          colorTag = "#311b92"  
          return colorTag 
        case "Educatif":
          colorTag = "#b71c1c"  
          return colorTag 
        case "Musée":
          colorTag = "#ff6f00"  
          return colorTag 
        case "Soirée":
          colorTag = "#d500f9"  
          return colorTag 
        default:

    }
  }
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      activityGroup: {
        title,
        body,
        createdAt,
        finishedAt,
        userImage,
        activityImage,
        userHandle,
        activityGroupId,
        commentCount,
        location,
        tag,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const deleteButton =
      authenticated && userHandle === handle ? (
        <EditActivityGroup activityGroupId={activityGroupId} activityGroup={this.props.activityGroup} />
      ) : null;
    const finishedDate = new Date(finishedAt);
    const newDate = new Date(finishedDate.getTime() - 7200000);
    return (
      <Card className={classes.card}>
        <CardMedia
          image={activityImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="h6" display="inline" word-break= "normal" >
            {title}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {location}
          </Typography>
          <Typography variant="body" color="textSecondary">
            {newDate.toLocaleString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
            
          </Typography>
         
          <br />
          <span>Créer par </span>
          <Typography
            variant="body1"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            @{userHandle}
          </Typography>
          <br />
          <Chip
              label={tag}
              className={classes.chip}
              size='small'
              variant ='outlined'
              style = {{
                color: 'white',
                background: this.renderSwitch(this.props.activityGroup.tag),
                border:  `1px solid ${this.renderSwitch(this.props.activityGroup.tag)}`,}}
              

            />

          <ActivityGroupDialog
            activityGroupId={activityGroupId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

ActivityGroup.propTypes = {
  user: PropTypes.object.isRequired,
  activityGroup: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(ActivityGroup));
