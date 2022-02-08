import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
// REdux
import { connect } from 'react-redux';
import { joinActivityGroup, leaveActivityGroup } from '../../redux/actions/dataActions';

export class JoinButton extends Component {
  
  joinedActivityGroup = () => {
    if (
      this.props.user.activityGroupParticipants &&
      this.props.user.activityGroupParticipants.find(
        (activityGroupParticipant) => activityGroupParticipant.activityGroupId === this.props.activityGroup.activityGroupId
      )
    )
    return true;
    else return false;
  };
  joinActivityGroup = () => {      

    this.props.joinActivityGroup(this.props.activityGroup.activityGroupId);
  };
  leaveActivityGroup = () => {
    this.props.leaveActivityGroup(this.props.activityGroup.activityGroupId);
  };
  render() {
    const { authenticated } = this.props.user;
    console.log(this.props)
    const joinButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Join Activity">
        <PersonAddIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.joinedActivityGroup() ? (
      <MyButton tip="Leave Activity" onClick={this.leaveActivityGroup} >
        <RemoveCircleOutlineIcon color="primary" />
      </MyButton>
    ) : (
      this.props.participantCount == this.props.memberLimit || this.props.activityGroup.userHandle === this.props.user.credentials.handle ? (
        <MyButton tip="Activity full">
        <PersonAddDisabledIcon color="primary" />
      </MyButton>  

      ) : (
        <MyButton tip="Join Activity" onClick={this.joinActivityGroup}>
          <PersonAddIcon color="primary" />
        </MyButton>    
        )
    );
    return joinButton;
  }
}

JoinButton.propTypes = {
  user: PropTypes.object.isRequired,
  activityGroup: PropTypes.string.isRequired,
  joinActivityGroup: PropTypes.func.isRequired,
  leaveActivityGroup: PropTypes.func.isRequired,
  activityGroup: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  joinActivityGroup: joinActivityGroup,
  leaveActivityGroup: leaveActivityGroup
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(JoinButton);