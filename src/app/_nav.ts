import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
    badge: {
      variant: "info",
      text: "NEW",
    },
  },
  {
    title: true,
    name: "Theme",
  },
  {
    name: "Usuarios",
    url: "/usuarios",
    icon: "icon-user",
  },
  {
    name: "Circunscripciones",
    url: "/circunscripciones",
    icon: "icon-folder",
  },
  {
    name: "Departamentos",
    url: "/departamentos",
    icon: "icon-folder",
  },
  {
    name: "Provincias",
    url: "/provincias",
    icon: "icon-folder",
  },
  {
    name: "Municipios",
    url: "/municipios",
    icon: "icon-folder",
  },
  {
    name: "Localidades",
    url: "/localidades",
    icon: "icon-folder",
  },
  {
    name: "Recintos",
    url: "/recintos",
    icon: "icon-folder",
  },
  {
    name: "Mesas",
    url: "/mesas",
    icon: "icon-folder",
  },

  {
    name: "Subir Votacion",
    url: "/subir",
    icon: "icon-folder",
  },
];
