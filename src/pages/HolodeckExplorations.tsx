import styled from 'styled-components';
import Planet from '../components/Planet';
import holodeck from '../assets/holodeck2.jpg'
import { useEffect, useState } from 'react';
import { starTrekAPI } from '../api';
import { PlanetType } from '../types/planets';
import stars from '../assets/stars.jpg'

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`

  background: url(${holodeck}) no-repeat center ;
  background-size: cover;
  padding-top: 500px;
  text-align: center;
  width: 100%;
`;


function HolodeckExplorations() {

  const [astronomicalObjects, setAstronomicalObjects] = useState<PlanetType[]>([]);

  useEffect(() => {
    starTrekAPI.get('/v2/rest/astronomicalObject/search?pageNumber=3&pageSize=10')
        .then(response => {
            setAstronomicalObjects(response.data.astronomicalObjects);
        })
        .catch(error => {
            console.error('Error fetching astronomical objects:', error);
        })
}, [])

    return (
        <Wrapper>
            <Header>Welcome to the Holodeck</Header>
            {
                astronomicalObjects
                    .filter(obj => obj.astronomicalObjectType === "PLANET")
                    .map(planet => (
                        <Planet
                            key={planet.uid}
                            name={planet.name}
                            image={stars}
                            dimensions={ [1, 32, 32]}
                        />
                    ))
            }
        </Wrapper>
    );
}

export default HolodeckExplorations;
