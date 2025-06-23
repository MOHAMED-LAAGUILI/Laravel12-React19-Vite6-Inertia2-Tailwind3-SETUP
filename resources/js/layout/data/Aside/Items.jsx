import {
  Calendar,
  House,
} from "lucide-react";


const baseMenuConfig = [
  { name: "Home", icon: <House size={15} /> },
  {
    title: "Calendars",
    icon: <Calendar size={15} />,
    items: ["Holidays Calendar", "Leaves Calendar"],
  },
 
];


export { baseMenuConfig };
