import React, { useState, useEffect } from "react";
import { Card, Table, Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const Restaurants = (props) => {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);

  const history = useHistory();
  const query = queryString.parse(props.query).borough;

  const previousPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    let uri = query
      ? `https://afternoon-peak-82019.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${query}`
      : `https://afternoon-peak-82019.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
    fetch(uri, {
      method: "GET",
      header: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.log(error));
  }, [query, page]);

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <Card.Title>Restaurant List</Card.Title>
          <Card.Text>Full list of restaurants.</Card.Text>
        </Card.Body>
      </Card>

      {restaurants !== null && restaurants.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant._id}
                onClick={() => history.push(`/restaurant/${restaurant._id}`)}
              >
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.building} {restaurant.address.street}
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Card bg="light" className="mt-4">
          <Card.Body>
            <Card.Text>No restaurants found</Card.Text>
          </Card.Body>
        </Card>
      )}

      {restaurants !== null && restaurants.length > 0 && (
        <Pagination className="mt-4">
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      )}
    </>
  );
};

export default Restaurants;
