import { Donor } from "./donor";
import { emmas, panera, pratoBay } from "./donor-constants";
import { houseOfFaith, stLucys } from "./kitchen-constants";
import { Volunteer } from "./volunteer";

export const me: Volunteer = {
  id: 1,
  name: "Ashton Tang",
  location: "Historic Downtown",
  email: "ashton.tang@gmail.com",
  phone: "201-555-6789",
  eventsAttended: 110,
  milesRun: 870,
  rescheduled: 12,
  foodInPound: 4010,
  foodInMeals: 3450,
  pastEvents: [
    {
      id: 2001,
      date: "2021-10-02",
      dd: 2,
      month: "October",
      day: "Saturday",
      donor: emmas,
      kitchen: houseOfFaith,
    },
    {
      id: 2002,
      date: "2021-10-09",
      dd: 9,
      month: "October",
      day: "Saturday",
      donor: panera,
      kitchen: stLucys,
    },
    {
      id: 2003,
      date: "2021-10-16",
      dd: 16,
      month: "October",
      day: "Saturday",
      donor: panera,
      kitchen: stLucys,
    },
    {
      id: 2004,
      date: "2021-10-17",
      dd: 17,
      month: "October",
      day: "Sunday",
      donor: pratoBay,
      kitchen: stLucys,
    },
  ],
  upcomingEvents: [
    {
      id: 2101,
      date: "2021-10-27",
      dd: 27,
      month: "October",
      day: "Wednesday",
      donor: panera,
      kitchen: stLucys,
    },
    {
      id: 2102,
      date: "2021-11-05",
      dd: 5,
      month: "November",
      day: "Friday",
      donor: panera,
      kitchen: stLucys,
    },
    {
      id: 2103,
      date: "2021-11-06",
      dd: 6,
      month: "November",
      day: "Saturday",
      donor: pratoBay,
      kitchen: stLucys,
    },
  ],
};
