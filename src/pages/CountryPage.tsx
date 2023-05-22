import { gql, useQuery } from "@apollo/client";
import { Card } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { Country } from "../types/country";

const CountryPage = () => {
  const { code } = useParams();

  const GET_COUNTRY_BY_COUNTRY_CODE = gql`
    query getCountryByCountryCode($code: ID!) {
      country(code: $code) {
        code
        name
        native
        phone
        capital
        currency
        emoji
        languages {
          name
        }
        continent {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COUNTRY_BY_COUNTRY_CODE, {
    variables: {
      code,
    },
  });

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const country: Country = data.country;

  return (
    <Card title={`Country ${country.emoji}`}>
      <p>Name: {country.name}</p>
      <p>Capital: {country.capital}</p>
      <p>Currency: {country.currency}</p>
      <p>Native name: {country.native}</p>
      <p>Phone prefix: {country.phone}</p>
      <p>continent name: {country.continent?.name}</p>
      <p>Code: {country.code}</p>
      <p>Languages:</p>
      <ul>
        {country.languages?.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
    </Card>
  );
};

export default CountryPage;
