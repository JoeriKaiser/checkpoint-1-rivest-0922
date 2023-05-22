import React from "react";
import "../App.css";

import { gql, useQuery } from "@apollo/client";
import { Link, Outlet } from "react-router-dom";
import { Card } from "antd";

import { Continent } from "../types/continent";

export const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      name
      code
    }
  }
`;

function Continents() {
  const { loading, error, data } = useQuery(GET_CONTINENTS);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const continents: Continent[] = data.continents;

  return (
    <div className="App">
      <Card title="Continents">
        {continents.map((continent) => (
          <Card.Grid key={continent.code}>
            <Link to={`/${continent.code}`}>
              <p>{continent.name}</p>
            </Link>
          </Card.Grid>
        ))}
      </Card>
      <Outlet />
    </div>
  );
}

export default Continents;
