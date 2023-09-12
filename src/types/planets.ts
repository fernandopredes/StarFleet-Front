/* eslint-disable @typescript-eslint/no-explicit-any */
export type Page = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

type Location = {
  uid: string;
  name: string;
};

type AstronomicalObject = {
  uid: string;
  name: string;
  astronomicalObjectType: 'PLANET' | 'NEBULA' | 'STAR_SYSTEM' | 'M_CLASS_PLANET';
  location: Location;
};

export type APIResponse = {
  page: Page;
  sort: {
      clauses: any[];
  };
  astronomicalObjects: AstronomicalObject[];
};


export type PlanetType = AstronomicalObject & {
  astronomicalObjectType: 'PLANET' | 'M_CLASS_PLANET';
};
