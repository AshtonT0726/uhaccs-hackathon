import { ayush, suveer, jacob, lamar } from "./guest-constants";
import { busch, livingston, collegeAvenue} from "./dining-hall-constants";
import { Volunteer } from "./volunteer";

export const me: Volunteer = {
  id: 1,
  name: "Ashton Tang",
  location: "Busch Campus",
  email: "ashton@rutgers.edu",
  phone: "201-555-6789",
  mealsHosted: 3,
  numberGuests: 3,
  moneySaved: 45,
  pastEvents: [
    {
      id: 2001,
      date: "2022-11-30",
      dd: 2,
      month: "November",
      day: "Wednesday",
      diningHall: busch,
      guest: suveer,
    },
    {
      id: 2002,
      date: "2022-11-26",
      dd: 9,
      month: "November",
      day: "Saturday",
      diningHall: livingston,
      guest: ayush,
    },
    {
      id: 2003,
      date: "2022-11-21",
      dd: 16,
      month: "November",
      day: "Monday",
      diningHall: collegeAvenue,
      guest: jacob,
    },
  ],
  upcomingEvents: [
    {
      id: 2101,
      date: "2022-12-5",
      dd: 27,
      month: "December",
      day: "Monday",
      diningHall: busch,
      guest: ayush,
    },
    {
      id: 2102,
      date: "2022-12-10",
      dd: 5,
      month: "December",
      day: "Saturday",
      diningHall: livingston,
      guest: lamar,
    },
  ],
};
