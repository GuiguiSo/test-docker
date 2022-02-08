import Container from '@material-ui/core/Container';
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';





const styles = (theme) => ({
    ...theme.spreadIt,
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

class login extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        password: '',
        errors: {}
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
    }
    handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginUser(userData, this.props.history);
    };
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    render() {
      const {
        classes,
        UI: { loading }
      } = this.props;
      const { errors } = this.state;
  
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
              <TextField
              variant="outlined"
              id="email"
              name="email"
              type="email"
              label="Email"
                required
                fullWidth
                autoComplete="email"
                autoFocus
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
              />
                          {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                              Connexion
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                <small>
              Vous n'avea pas de compte ? <Link to="/signup"> Inscrivez vous ici</Link>
            </small>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      )
  }
}
  
  login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    loginUser
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(login));
  