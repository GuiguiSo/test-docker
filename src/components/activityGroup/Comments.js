  
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

var locale_fr = require('dayjs/locale/fr');

const styles = (theme) => ({
  ...theme.spreadIt,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          const createdAtDate = new Date(createdAt);
          const newDate = new Date(createdAtDate.getTime());
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
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
                      <hr className={classes.invisibleSeparator} />
                      <div style={{ wordWrap: 'break-word' , whiteSpace: "pre-line" }} > 
                      <Typography display="inline" color="textprimary" variant="body">
                        {body}
                      </Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);