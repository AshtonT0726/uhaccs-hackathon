import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Food Kitchen",
  },
  {
    name: "Kitchen Group",
    url: "/kitchen/group",
    icon: "cil-object-group",
  },
  {
    name: "Food Kitchen",
    url: "/kitchen/kitchen",
    icon: "cil-restaurant",
  },
  {
    name: "Kitchen Calendar",
    url: "/dailyneeds/calendar",
    icon: "cil-calendar",
  },
  {
    title: true,
    name: "Food Donors",
  },
  {
    name: "Food Donor",
    url: "/donor/donor",
    icon: "cil-restaurant",
  },
  
  {
    name: "Donation Calendar",
    url: "/dailydonations/calendar",
    icon: "cil-calendar-check",
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
    title: true,
    name: "Volunteer",
  },
  {
    name: "Volunteer",
    url: "/volunteer/me",
    icon: "cil-people",
  },
  {
    name: "SmartFood Delivery",
    url: "http://www.cnn.com/",
    icon: "icon-layers",
    class: "mt-auto",
    variant: "danger",
    attributes: { target: "_blank", rel: "noopener" },
  },
];
