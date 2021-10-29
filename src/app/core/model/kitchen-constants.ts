import { Kitchen, KitchenGroup } from "./kitchen";

export const jerseyCityGroup: KitchenGroup = {
  id: 51,
  name: "JERSEY CITY / HOBOKEN",
};

export const lowerManhattanGroup: KitchenGroup = {
  id: 52,
  name: "LOWER MANHATTAN",
};

export const stLucys: Kitchen = {
  id: 1,
  name: "St. Lucy's",
  location: "Historic Downtown",
  address: "619 Grove Street, Jersey City, NJ 07310",
  phone: "(201) 656-7201",
  description: `A supervised 24-hour, 7-day-a-week, year-round emergency shelter facility
     for single women and men offering emergency housing and food for those in need.`,
  group: jerseyCityGroup,
  monthAvg: 2728,
};

export const hobokenShelter: Kitchen = {
  id: 2,
  name: "Hoboken Shelter",
  location: "Hoboken",
  address: "300 Bloomfield St, Hoboken, NJ 07030",
  phone: "(201) 656-5069",
  description: `The Hoboken Shelter provides food, shelter, case management, counseling, 
    skills-training, and permanent supportive housing solutions to our guests.`,
  group: jerseyCityGroup,
  monthAvg: 1002,
};

export const houseOfFaith: Kitchen = {
  id: 3,
  name: "The House of Faith",
  location: "Journal Square",
  address: "244 Ege Ave, Jersey City, NJ 07304",
  phone: "(201) 435-6100",
  description: `The House of Faith is a transitional housing program for assisting clients
   in need with housing and other supportive services in Hudson County.`,
  group: jerseyCityGroup,
  monthAvg: 1680,
};

export const lunchtime: Kitchen = {
  id: 4,
  name: "Lunchtime Ministry",
  location: "Hoboken",
  address: "57 8th St, Hoboken, NJ 07030",
  phone: "(201) 659-4499",
  description: `A warm meal, hospitality & community - Lunchtime Ministry provides an oasis
   for those who need a nourishing meal and a place to sit with friends.`,
  group: jerseyCityGroup,
  monthAvg: 980,
};

export const nycRescue: Kitchen = {
  id: 11,
  name: "NYC Rescue Mission",
  location: "Lower Manhattan",
  address: "90 Lafayette St, New York, NY 10013",
  phone: "(917) 206-1440",
  description: `NYC Rescue Mission offers services at our same location on 90 Lafayette Street in Tribeca, 
  and at seven additional campuses in the New York metro area.`,
  group: lowerManhattanGroup,
  monthAvg: 2760,
};

export const boweryMission: Kitchen = {
  id: 12,
  name: "Bowery Mission",
  location: "Lower Manhattan",
  address: "227 Bowery St. New York, NY 10002",
  phone: "(201) 435-6100",
  description: `Bowery Mission is the oldest Christian rescue mission in New York City,
   well-known for its history as a soup kitchen and men's shelter.`,
  group: lowerManhattanGroup,
  monthAvg: 3420,
};

export const theDoor: Kitchen = {
  id: 13,
  name: "The Door Food Kitchen",
  location: "Lower Manhattan",
  address: "555 Broome St, New York, NY 10013",
  phone: "(212) 941-9090",
  description: `The Door offers evening meals during weekday, along with snacks, nutritional 
  education and counseling from experienced professionals. `,
  group: lowerManhattanGroup,
  monthAvg: 2452,
};
