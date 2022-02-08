import React, { Component, useEffect } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "google-maps-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import store from "../../redux/store";
import ActivityGroupDialog from "../activityGroup/ActivityGroupDialog";
import { Label } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";


export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    activityGroup: null,
  };

  renderSwitch(tag){
    let iconImg = ""
    switch(tag){
      case "Jeux":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeJeux.png?alt=media"  
          return iconImg
      case "Aquatique": 
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeAquatique.png?alt=media&token=c4c31eed-16cb-4bfa-a5c3-0fe8b946173c"  
          return iconImg
        case "Bowling":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeBowling.png?alt=media&token=8ff6bcdf-45b8-4ac2-9c3a-aeaf51ed5a89"  
          return iconImg 
        case "Art":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/art.png?alt=media&token=e67c2faf-746d-4c10-a8d2-3e12181fd145"  
          return iconImg 
        case "Pleine air":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconePleinair.png?alt=media&token=1754dea2-4706-4776-ae7b-7267cce3d7ae"  
          return iconImg 
        case "Sport":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeSport.png?alt=media&token=3bad02fb-9788-425d-aa3a-07a03f675c89"  
          return iconImg 
        case "Arcade":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeArcade.png?alt=media&token=ba56ac83-6032-4d22-8e1e-5fa260ab1e41"  
          return iconImg 
        case "Educatif":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeEducatif.png?alt=media&token=954cb884-64ee-48d2-bc0a-17261f9a675c"  
          return iconImg 
        case "Musée":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeMusee.png?alt=media&token=be37836a-9726-47f3-aefc-ce65427dc795"  
          return iconImg 
        case "Soirée":
          iconImg = "https://firebasestorage.googleapis.com/v0/b/meeko-516ff.appspot.com/o/iconeSoiree.png?alt=media&token=60094760-77e0-46ad-ab2f-407f92220054"  
          return iconImg 
        default:

    }
  }

  handleOpen = (props) => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${this.state.selectedPlace.activityGroup.userHandle}/activityGroup/${this.state.selectedPlace.activityGroup.activityGroupId}`;

    if (oldPath === newPath) oldPath = `/`;

    window.history.pushState(null, null, newPath);
  };

  onMarkerClick = (props, marker) => {
    console.log(props);
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    let finishedDate = ""
    let newDate = ""
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "100%", position: "absolute", width: "100%" }}
        containerStyle={{ height: this.props.height, width: this.props.width }}
        zoom={13}
        maxZoom={17}
        minZoom={6}
        initialCenter={{
          lat: this.props.centerLat,
          lng: this.props.centerLng,
        }}
      >
        {this.props.activityGroups.map((activityGroup) => {
             let date = new Date(activityGroup.finishedAt)
             let activityInclude = "false"
             if (activityGroup.tag !== null) {
               activityInclude = this.props.activeTag.includes(activityGroup.tag)
             }
             if(date > new Date() && (activityInclude || this.props.activeTag == 0) ){
            let iconImg = this.renderSwitch(activityGroup.tag)
            return (
              <Marker
                name="Marker 1"
                activityGroup={activityGroup}
                onClick={this.onMarkerClick}
                key={activityGroup.activityGroupId}
                position={{ lat: activityGroup.lat, lng: activityGroup.lng }}
                icon={{
                  url: iconImg,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              ></Marker>
            );
          }
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          {this.state.selectedPlace.activityGroup && (
           
            
            <CardContent>
              <h2>{this.state.selectedPlace.activityGroup.title}</h2>
              <p>{this.state.selectedPlace.activityGroup.body}</p>
            </CardContent>
          )}
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyCS-YbV0v1EYqL6dYKc6bncIOQWLJTR0Xc",
  })(MapContainer)
);
