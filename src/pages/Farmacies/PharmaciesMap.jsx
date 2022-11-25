import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Icon, Label } from "semantic-ui-react";
import { useState } from "react";

export const PharmaciesMap = ({ pharmacies }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [directions, setDirections] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // const fetchDirections = (location) => {
  //   console.log(google.maps);
  //   console.log(<GoogleMapReact></GoogleMapReact>);
  //   const service = new google.maps.DirectionsService();
  //   service.route(
  //     {
  //       origin: coordinates,
  //       destination: location,
  //       travelMode: google.maps.DirectionsTravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status == "OK" && result) setDirections(result);
  //     }
  //   );
  // };

  return (
    <div className="map_container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAfwClphOoi7iVTBDmOmIqW47k3HfJ8AgU" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        // options={""}
        // onChange={""}
        // onChildClick={}
        onClick={(ev) => {
          console.log("latitide = ", ev.lat);
          console.log("longitude = ", ev.lng);
        }}
      >
        {pharmacies?.map((pharmacy) => {
          return (
            <div
              lat={pharmacy?.location?.lat}
              lng={pharmacy?.location?.lng}
              key={pharmacy._id}
              className="marker_container"
            >
              <Label className="marker_label" color="blue">
                {pharmacy?.name}
              </Label>
              <Icon
                className="marker_icon"
                name="map marker alternate"
                // onClick={() => {
                //   fetchDirections(pharmacy?.location);
                // }}
              />
            </div>
          );
        })}
        <div
          lat={coordinates?.lat}
          lng={coordinates?.lng}
          className="marker_container"
        >
          <Label className="marker_label_me" color="red">
            Tu ubicacion{" "}
          </Label>
          <Icon className="marker_icon_me" name="map marker alternate" />
        </div>
      </GoogleMapReact>
    </div>
  );
};
