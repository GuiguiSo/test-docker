import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import ActivityGroup from "../components/activityGroup/ActivityGroup";
import ActivityGroupSkeleton from "../util/ActivityGroupSkeleton";

import { connect } from "react-redux";
import { getActivityGroups } from "../redux/actions/dataActions";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import MapContainer from "../components/googleMap/MapContainer";
import Profile from '../components/profile/Profile';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 600,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
  "Jeux",
  "Bowling",
  "Art",
  "Pleine air",
  "Sport",
  "Arcade",
  "Aquatique",
  "Educatif",
  "Musée",
  "Soirée",
];

class home extends Component {
  renderSwitch(tag) {
    let colorTag = "";
    switch (tag) {
      case "Jeux":
        colorTag = "#311b92";
        return colorTag;
      case "Aquatique":
        colorTag = "#1976d2";
        return colorTag;
      case "Bowling":
        colorTag = "#004d40";
        return colorTag;
      case "Art":
        colorTag = "#880e4f";
        return colorTag;
      case "Pleine air":
        colorTag = "#2e7d32";
        return colorTag;
      case "Sport":
        colorTag = "#aeea00";
        return colorTag;
      case "Arcade":
        colorTag = "#311b92";
        return colorTag;
      case "Educatif":
        colorTag = "#b71c1c";
        return colorTag;
      case "Musée":
        colorTag = "#ff6f00";
        return colorTag;
      case "Soirée":
        colorTag = "#d500f9";
        return colorTag;
      default:
    }
  }

  state = {
    tag: [],
  };
  componentDidMount() {
    this.props.getActivityGroups();
  }

  render() {
    const handleChange = (event) => {
      this.setState({
        tag: event.target.value,
      });
    };
    const { classes } = this.props;
    const { activityGroups, loading } = this.props.data;
    let recentActivityGroupsMarkup = !loading ? (
      activityGroups.map((activityGroup) => {
        let date = new Date(activityGroup.finishedAt);
        let activityInclude = false;
        if (activityGroup.tag !== null) {
          activityInclude = this.state.tag.includes(activityGroup.tag);
        }
        if (date > new Date() && (activityInclude || this.state.tag == 0)) {
          return (
            <ActivityGroup
              key={activityGroup.activityGroupId}
              activityGroup={activityGroup}
            />
          );
        }
      })
    ) : (
      <ActivityGroupSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          <FormControl>
            <InputLabel id="demo-mutiple-checkbox-label">
              Selection des Type d'activité
            </InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={this.state.tag}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{ width: 300, marginBottom: 10 }}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={this.state.tag.indexOf(tag) > -1} />
                  <Chip
                    label={tag}
                    primary={tag}
                    style={{
                      color: "white",
                      background: this.renderSwitch(tag),
                      border: `1px solid ${this.renderSwitch(tag)}`,
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {recentActivityGroupsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
          <br />
          <MapContainer
            activityGroups={activityGroups}
            activeTag={this.state.tag}
            height={"50%"}
            width={"20%"}
            centerLat={45.764043}
            centerLng={4.835659}
            style={{
              maxWidth: "450px",
              height: "350px",
              overflowX: "hidden",
              overflowY: "hidden",
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getActivityGroups: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getActivityGroups })(home);
