import React from "react";

const Home = React.lazy(() => import("./pages/home/Home"));
const About = React.lazy(() => import("./pages/about"));
const Sharing = React.lazy(() => import("./pages/sharing"));
const CreateShare = React.lazy(() => import("./pages/createshare"));
const Profile = React.lazy(() => import("./pages/profile"));
const Leaning = React.lazy(() => import("./pages/leaning"));
const Doctor = React.lazy(() => import("./pages/doctor"));

const FourZeroFour = React.lazy(() => import("./pages/404"));

const routes = [
  { path: "/", exact: true, name: "HOME", component: Home },
  { path: "/home", exact: true, name: "HOME", component: Home },
  { path: "/about", name: "ABOUT US", component: About },
  { path: "/sharing", name: "SHARING", component: Sharing },
  { path: "/e-leaning", name: "LEANING", component: Leaning },
  { path: "/doctor", name: "DOCTOR", component: Doctor },
  { path: "/profile", name: "PROFILE", component: Profile },
  { path: "/CreateShare", name: "PROFILE", component: CreateShare },


  { path: "*", name: "404", component: FourZeroFour }
];

export default routes;
