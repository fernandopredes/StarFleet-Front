import styled from 'styled-components';
import Planet from '../components/Planet';
import holodeck from '../assets/holodeck2.jpg'
import { useEffect, useState } from 'react';
import { starTrekAPI } from '../api';
import { PlanetType } from '../types/planets';
import stars from '../assets/stars.jpg'
import { planetMappings } from '../utils/planetsData';

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  background: url(${holodeck}) no-repeat center;
  background-size: cover;
  background-position: bottom;
  padding-top: 500px;
  width: 100%;
  position: relative;

  & > span {
    font-size: 48px;
    font-weight: 400;
    position: absolute;
    bottom: 10vh;
    left: 5vw;
    text-align: start;
  }
  @media (max-width: 768px) {
    & > span {
      bottom: 8vh;
      left: 3vw;
    }
  }
`;

const Sidebar = styled.div`
    width: 250px;
    height: 100%;
    overflow-y: auto;
    padding: 16px;
    border: 2px solid #B0B0B0;
    background-color: rgba(176, 176, 176, 0.1);
    border-radius: 5px;
    .planet{
      font-size: 24px;
      margin: .5rem 0;
      cursor: pointer;
      &:hover{
        color: #ffc164;
      }
    }
`;

const PlanetDisplay = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2px solid #B0B0B0;
    background-color: rgba(176, 176, 176, 0.1);
    border-radius: 5px;
`;

const Container = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    gap:25px;
    width: 600px;
`;

const TextBox = styled.div`
  font-size: 24px;
  margin-top: 1rem;
  margin-bottom: 5rem;
  max-width: 570px;
  border: 2px solid #B0B0B0;
  background-color: rgba(176, 176, 176, 0.1);
  border-radius: 5px;
  padding: 16px;
`


function HolodeckExplorations() {
  const [astronomicalObjects, setAstronomicalObjects] = useState<PlanetType[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetType | null>(null);

  useEffect(() => {
    starTrekAPI.get('/v2/rest/astronomicalObject/search?pageNumber=3&pageSize=10')
        .then(response => {
          const planets = response.data.astronomicalObjects.filter((obj: PlanetType) => obj.astronomicalObjectType === "PLANET");
            setAstronomicalObjects(planets)
            if (planets.length > 0) {
                setSelectedPlanet(planets[0])
            }
        })
        .catch(error => {
            console.error('Error fetching astronomical objects:', error);
        })
}, []);

  return (
    <Wrapper>
        <Header>
          <span>Welcome to the Holodeck</span>
        </Header>
        <Container>
          {astronomicalObjects.length > 0 ? (
            <>
              <Sidebar>
                  {astronomicalObjects
                      .filter(obj => obj.astronomicalObjectType === "PLANET")
                      .map(planet => (
                          <div className='planet' key={planet.uid} onClick={() => setSelectedPlanet(planet)}>
                              {planet.name}
                          </div>
                      ))}
              </Sidebar>
              <PlanetDisplay>
                  {selectedPlanet && (
                      <Planet
                          key={selectedPlanet.uid}
                          name={selectedPlanet.name}
                          image={planetMappings[selectedPlanet.name]?.image || stars}
                          dimensions={planetMappings[selectedPlanet.name]?.dimensions || [1.7, 37, 34]}
                      />
                  )}
              </PlanetDisplay>
            </>
          ) : (
            <span>Carregando...</span>
          )}
        </Container>
        <TextBox>
          <p>{planetMappings[selectedPlanet!.name]?.text || "No data found."}</p>
        </TextBox>
    </Wrapper>
  );
}

export default HolodeckExplorations;
