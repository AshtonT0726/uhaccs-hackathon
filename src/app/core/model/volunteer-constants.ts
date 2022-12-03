import { Donor } from "./donor";
import { ayush } from "./guest-constants";
import { busch } from "./dining-hall-constants";
import { Volunteer } from "./volunteer";

export const me: Volunteer = {
  id: 1,
  name: "Ashton Tang",
  location: "Busch Campus",
  email: "ashton@rutgers.edu",
  phone: "201-555-6789",
  mealsHosted: 8,
  numberGuests: 3,
  rescheduled: 12,
  moneySaved: 120,
  foodInMeals: 3450,
  pastEvents: [
    {
      id: 2001,
      date: "2021-10-02",
      dd: 2,
      month: "October",
      day: "Saturday",
      diningHall: busch,
      guest: ayush,
    },
    {
      id: 2002,
      date: "2021-10-09",
      dd: 9,
      month: "October",
      day: "Saturday",
      diningHall: busch,
      guest: ayush,
    },
    {
      id: 2003,
      date: "2021-10-16",
      dd: 16,
      month: "October",
      day: "Saturday",
      diningHall: busch,
      guest: ayush,
    },
    {
      id: 2004,
      date: "2021-10-17",
      dd: 17,
      month: "October",
      day: "Sunday",
      diningHall: busch,
      guest: ayush,
    },
  ],
  upcomingEvents: [
    {
      id: 2101,
      date: "2021-10-27",
      dd: 27,
      month: "October",
      day: "Wednesday",
      diningHall: busch,
      guest: ayush,
    },
    {
      id: 2102,
      date: "2021-11-05",
      dd: 5,
      month: "November",
      day: "Friday",
      diningHall: busch,
      guest: ayush,
    },
  ],
};
