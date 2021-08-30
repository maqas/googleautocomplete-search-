import React, { Component } from 'react'; 
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";


export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //for google map placess autocomplete.
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {
                lat: -1.286389, 
                lng: 36.817223
        }
      };
    }
    
    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            console.log('Success', latLng);

            // updating the center state to give searched location
            this.setState({ address });
            this.setState({ mapCenter: latLng });
          })
          .catch(error => console.error('Error', error));
      };

      // fetchPalces(mapProps, map) {
      //   const {google} = mapProps;
      //   const service = new google.maps.places.PlacesService(map);
      // }
   
    render() {
      const style = {
        width: '50vw',
        height: '50vh',
        margin: 'auto',
        
      }
      return (
        
          <div style={style}>
            
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                        
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#ffff00', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>

             <Map id = "Mapframe"
             
                      google={this.props.google}
                      onReady = { this.fetchPlaces }
                      visible = {true}
                        /* the below code set the initial marker to Nairobi which is the Initial Center only when the page is fresh */
                        initialCenter = {{ 
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        center = {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                >
        {/* center is used to update the current location for a new searched location  */}

                    <Marker 
                        position= {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }} 
                    />
                    <listing places = {this.state.places} />
            </Map>
          </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: ('AIzaSyCssVxYVYdWxaNs-F3QKWzOAD1TzCkFVvA')
  })(MapContainer)

