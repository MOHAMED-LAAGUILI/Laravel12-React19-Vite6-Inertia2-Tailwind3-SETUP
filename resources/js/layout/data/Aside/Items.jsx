import {
  House,
  UserCheck,
} from "lucide-react";


const baseMenuConfig = [
  { name: "Home", icon: <House size={15} /> },
  {
    title: "Admin",
    icon: <UserCheck size={15} />,
    items: ["Users", "Roles","Permissions"],
  },
 
];


export { baseMenuConfig };
