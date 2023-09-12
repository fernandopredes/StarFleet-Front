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

const PlanetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  width: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  border-radius: 8px;
`;


function HolodeckExplorations() {

  const [astronomicalObjects, setAstronomicalObjects] = useState<PlanetType[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetType | null>(null);

  const handlePlanetClick = (planet: PlanetType) => {
    setSelectedPlanet(planet);
  };

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
        <PlanetGrid>
          {astronomicalObjects
            .filter(obj => obj.astronomicalObjectType === "PLANET")
            .map(planet => (
              <Planet
                key={planet.uid}
                name={planet.name}
                image={stars}
                dimensions={[1, 32, 32]}
                onClick={() => handlePlanetClick(planet)}
              />
            ))}
        </PlanetGrid>
        {selectedPlanet && (
          <ModalBackground onClick={() => setSelectedPlanet(null)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              {/* Isso impede que o modal feche quando você clicar nele */}
              <h2>{selectedPlanet.name}</h2>
              {/* Aqui você pode adicionar mais informações sobre o planeta */}
            </ModalContent>
          </ModalBackground>
        )}
      </Wrapper>
    );
}

export default HolodeckExplorations;
