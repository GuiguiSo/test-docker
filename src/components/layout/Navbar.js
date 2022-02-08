import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostActivityGroup from "../activityGroup/PostActivityGroup";
import Notifications from "./Notifications";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

// Icons
import HomeIcon from "@material-ui/icons/Home";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { logoutUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  logoutNavbar: {
    position: "absolute",
    left: "93%",
  },
});

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { authenticated, classes } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <Fragment>
                
                <PostActivityGroup />
                <Link to="/">
                  <MyButton tip="Home">
                    
                    <HomeIcon />
                  </MyButton>
                </Link>
                <Notifications />
              </Fragment>
              <Fragment >
                <MyButton
                  tip="Logout"
                  onClick={this.handleLogout}
                  className={classes.logoutNavbar}
                >
                  <KeyboardReturn color="primary" />
                  <Typography variant="body2" style={{color: "white"}}>Logout</Typography>
                </MyButton>
              </Fragment>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={Link} to="/">
                Accueil
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Inscription
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapActionsToProps = { logoutUser };

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
