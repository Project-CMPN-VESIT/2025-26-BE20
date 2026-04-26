import { useEffect, useState } from "react";
import "./App.css";
import "chart.js/auto"; 
import 'remixicon/fonts/remixicon.css';
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import useDynamicTitle from "./hooks/useDynamicTitle";

function App() {
  // const [darkMode, setDarkMode] = useState(
  //   JSON.parse(localStorage.getItem("darkMode")) ||
  //     (localStorage.getItem("darkMode") === null
  //       ? window.matchMedia("(prefers-color-scheme: dark)").matches
  //       : false) ||
  //     false
  // );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const links = [];
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);
    links.push(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);
    links.push(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap';
    document.head.appendChild(link3);
    links.push(link3);
  }, []);
  

  // useEffect(() => {
  //   localStorage.setItem("darkMode", JSON.stringify(darkMode));

  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  useEffect(() => {
  // Always forcing light mode
  document.documentElement.classList.remove("dark");
  localStorage.setItem("darkMode", JSON.stringify(false));
}, []);


  const onDarkModeChange = () => {
    // setDarkMode(!darkMode);
    // localStorage.setItem("darkMode", JSON.stringify(darkMode));

    //setting dark mode is disabled
    setDarkMode(false);
  };

  useDynamicTitle();

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} onDarkModeChange={onDarkModeChange} />
    </>
  );
}

export default App;
