export interface CountryModel {
    name: Name;
    tld?: string[];
    cca2?: string;
    ccn3?: string;
    cca3: string;
    cioc?: string;
    independent?: boolean;
    status?: string;
    unMember?: boolean;
    currencies?: Record<string, Currency>; // Flexible for different currencies
    idd?: Idd;
    capital?: string[];
    altSpellings?: string[];
    region?: string;
    subregion?: string;
    languages?: Record<string, string>; // Flexible for different languages
    translations?: Record<string, Translation>;
    latlng?: number[];
    landlocked?: boolean;
    borders?: string[];
    area?: number;
    demonyms?: Demonyms;
    flag?: string;
    maps?: Maps;
    population?: number;
    gini?: Record<string, number>; // Flexible for dynamic years
    fifa?: string;
    car?: Car;
    timezones?: string[];
    continents?: string[];
    flags?: Flags;
    coatOfArms?: CoatOfArms;
    startOfWeek?: string;
    capitalInfo?: CapitalInfo;
    postalCode?: PostalCode;
  }
  
  export interface PostalCode {
    format?: string;
    regex?: string;
  }
  
  export interface CapitalInfo {
    latlng?: number[];
  }
  
  export interface CoatOfArms {
    png?: string;
    svg?: string;
  }
  
  export interface Flags {
    png?: string;
    svg?: string;
    alt?: string;
  }
  
  export interface Car {
    signs?: string[];
    side?: string;
  }
  
  export interface Maps {
    googleMaps?: string;
    openStreetMaps?: string;
  }
  
  export interface Demonyms {
    eng?: GenderedNames;
    fra?: GenderedNames;
  }
  
  export interface GenderedNames {
    f?: string;
    m?: string;
  }
  
  export interface Translation {
    official?: string;
    common?: string;
  }
  
  export interface Idd {
    root?: string;
    suffixes?: string[];
  }
  
  export interface Currency {
    name?: string;
    symbol?: string;
  }
  
  export interface Name {
    common?: string;
    official?: string;
    nativeName?: Record<string, Translation>;
  }
  