import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";

import marker from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

const Restaurant = ({ id }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const markerIcon = L.icon({
    iconUrl: marker,
    shadowUrl: shadow,
  });

  let grades = [];
  if (restaurant) {
    for (let i = 0; i < restaurant.grades.length; i++) {
      grades.push(
        <Card key={i}>
          <Card.Header as="h5">Grade: {restaurant.grades[i].grade}</Card.Header>
          <Card.Body>
            <Card.Text>
              Completed:{" "}
              <Moment date={restaurant.grades[i].date} format="YYYY/MM/DD" />
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }

  useEffect(() => {
    console.log(id);
    setLoading(true);
    fetch(`https://afternoon-peak-82019.herokuapp.com/api/restaurants/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {restaurant && !loading ? (
        <>
          <Card bg="light" className="mb-4">
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>

          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
              icon={markerIcon}
            ></Marker>
          </MapContainer>

          <h3 className="my-4 pb-2 border-bottom">Ratings</h3>

          <CardDeck className="mb-4">{grades}</CardDeck>
        </>
      ) : (
        <Card bg="light" className="mt-4">
          <Card.Body>
            <Card.Text>Unable to find Restaurant with id: {id}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Restaurant;
