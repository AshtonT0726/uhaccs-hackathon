import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    title: true,
    name: "My Guests",
  },
  {
    name: "Guests",
    url: "/guest/guest",
    icon: "cil-object-group",
  },
  {
    title: true,
    name: "Dining Options",
  },
  {
    name: "Dining Locations",
    url: "/dining/dining",
    icon: "cil-restaurant",
  },
  {
    name: "Dining Calendar",
    url: "/diningcalendar/calendar",
    icon: "cil-calendar-check",
  },
  {
    title: true,
    name: "Volunteer",
  },
  {
    name: "Volunteer",
    url: "/volunteer/me",
    icon: "cil-people",
  },
  {
    name: "Guest Swipe Tracking",
    url: "http://www.cnn.com/",
    icon: "icon-layers",
    class: "mt-auto",
    variant: "danger",
    attributes: { target: "_blank", rel: "noopener" },
  },
];
