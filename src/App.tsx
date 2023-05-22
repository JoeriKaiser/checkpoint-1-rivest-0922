import React from 'react';
import './App.css';
import { gql, useQuery } from "@apollo/client";
import { Card } from 'antd';
import { Continent } from './types/continent';
import { Link, Outlet } from 'react-router-dom';

export const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      name
      code
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CONTINENTS)

  const handleClick = () => {
    console.log("TEST")
  }
  
  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }
  
  const continents: Continent[] = data.continents

  return (
    <div className="App">
        <Card title='Continents'>
          {continents.map((continent) => (
            <Card.Grid
                onClick={handleClick}
                key={continent.code}
                >
                  <Link to={`/${continent.code}`}>
                    {continent.name}
                  </Link>
              </Card.Grid>
          ))}
        </Card>
        <Outlet />
    </div>
  );
}

export default App;
