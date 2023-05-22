import { gql, useQuery } from "@apollo/client";
import { Card } from "antd";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Country } from "../types/country";

const Countries = () => {
  let { code } = useParams();

  const GET_COUNTRIES_BY_CONTINENT_CODE = gql`
    query getCountriesByContinent($filter: CountryFilterInput!) {
      countries(filter: $filter) {
        name
        code
        emoji
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COUNTRIES_BY_CONTINENT_CODE, {
    variables: {
      filter: {
        continent: {
          eq: code,
        },
      },
    },
  });

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const countries: Country[] = data.countries;

  return (
    <Card title="countries">
      {countries.map((country: any) => (
        <Card.Grid key={country.code}>
          <Link to={`/country/${country.code}`}>
            <span>{country.emoji}</span>
            <p>{country.name}</p>
          </Link>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default Countries;
