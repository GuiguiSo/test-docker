import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";

const searchOptions = {
  componentRestrictions: { country: ['us'] },
  types: ['city']
}

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      address: this.props.address ? this.props.address : "",
        lat: "",
        lng: "",
    };
  }


  handleChange = (address) => {
    console.log(address);
    this.setState({ address });
  };

  handleSelect = async value => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    console.log(latLng.lng)
    this.setState({ address: value, lat: latLng.lat, lng: latLng.lng});
    this.props.methodfromparent(this.state.address, this.state.lat, this.state.lng)
    console.log(this.state);
  };

  
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
              name="location"
              type="text"
              label="location"
              multiline
              rows="1"
              variant="outlined"
              placeholder="Adresse de l'activitée"
              fullWidth
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
