import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ActivityGroup from '../components/activityGroup/ActivityGroup';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ActivityGroupSkeleton from '../util/ActivityGroupSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    activityGroupIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const activityGroupId = this.props.match.params.activityGroupId;
    if (activityGroupId) this.setState({ activityGroupIdParam: activityGroupId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { activityGroups, loading } = this.props.data;
    const { activityGroupIdParam } = this.state;

    const activityGroupsMarkup = loading ? (
      <ActivityGroupSkeleton />
    ) : activityGroups === null ? (
      <p>l'utilisateur n'a pas d'activité</p>
    ) : !activityGroupIdParam ? (
      activityGroups.map((activityGroup) => {
        let date = new Date(activityGroup.finishedAt)
        if(date > new Date()){
          return <ActivityGroup key={activityGroup.activityGroupId} activityGroup={activityGroup}/>
        }
      } )
    ) : (
      activityGroups.map((activityGroup) => {
        let date = new Date(activityGroup.finishedAt)
        if(date > new Date()){
          if (activityGroup.activityGroupId !== activityGroupIdParam)
          return <ActivityGroup key={activityGroup.activityGroupId} activityGroup={activityGroup} />;
        else return <ActivityGroup key={activityGroup.activityGroupId} activityGroup={activityGroup} openDialog />;
        }
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {activityGroupsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
