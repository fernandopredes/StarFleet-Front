import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';

type PlanetMapping = {
  image: string;
  dimensions: [number, number, number];
  text: string;
}

export type PlanetMappings = {
  [key: string]: PlanetMapping;
}

export const planetMappings: PlanetMappings = {
  "Adelphous IV": {
    image: p1,
    dimensions: [1.5, 35, 32],
    text:"Adelphous IV is a mysterious and uncharted Class M planet. Located in the Alpha Quadrant, its shimmering blue oceans and towering mountain ranges make it visually stunning. The U.S.S. Enterprise once detected anomalous energy readings here, leading to an exploration that revealed ancient alien artifacts."
  },
  "Adigeon Prime": {
    image: p2,
    dimensions: [1.1, 37, 34],
    text:"A hub for advanced medical research, Adigeon Prime is known for its top-tier medical facilities. Species from across the galaxy visit to undergo the Adigeon's highly specialized surgical procedures. The planet's surface is dotted with research complexes amid lush green landscapes"
  },
  "Agaron": {
    image: p5,
    dimensions: [1.2, 37, 34],
    text:"Agaron is a serene, temperate world in the Delta Quadrant. Its inhabitants, the Agarons, once practiced genetic engineering but abandoned it due to unforeseen consequences. Now, they live harmoniously, focusing on agricultural pursuits and peaceful trade with neighboring systems."
  },
  "Ahmedeen": {
    image: p4,
    dimensions: [0.9, 37, 34],
    text:"Situated on the outer edges of the Beta Quadrant, Ahmedeen is a bustling trade hub. With vast deserts contrasted by massive urban areas, it's a meeting point for various cultures and species, promoting an atmosphere of coexistence and mutual respect."
  },
  "Aia": {
    image: p3,
    dimensions: [1.4, 37, 34],
    text:"Known as the 'Emerald Star', Aia stands out due to its unique green skies caused by its rich atmosphere. Home to ancient telepathic species, it's said that the planet's forests can communicate with those who walk their paths. A place of spirituality and connection."
  },
  "Ajilon Prime": {
    image: p6,
    dimensions: [1.0, 37, 34],
    text:"Located near the Klingon border, Ajilon Prime has faced its share of conflict. Its strategic position makes it valuable, leading to occasional skirmishes. However, its resilient inhabitants always rebuild, making the planet a symbol of endurance and hope."
  },
}
