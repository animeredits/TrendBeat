/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ParticlesBackground from "./Components/ParticlesBackground";
const App = () => {
  const [Progress, setProgress] = useState(0);
  const [query, setQuery] = useState("Anime");
  const country = "in";
  const pageSize = 100;
  const apikey = import.meta.env.VITE_NEWS_API;
  return (
    <>
      <div className="scroll-container">
      <LoadingBar color="#27c4f5" height={3} progress={Progress} />
      <Navbar setQuery={setQuery} />
      <ParticlesBackground />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key={query || "Technology"}
              pageSize={pageSize}
              query={query}
              country={country}
              category="Technology"
            />
          }
        ></Route>
        <Route
          path="/Business"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key={query || "Business"}
              pageSize={pageSize}
              query={query}
              country={country}
              category="Business"
            />
          }
        ></Route>
        <Route
          path="/Entertainment"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="Entertainment"
              pageSize={pageSize}
              query={query}
              country={country}
              category="Entertainment"
            />
          }
        ></Route>
        <Route
          path="/General"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="General"
              pageSize={pageSize}
              query={query}
              country={country}
              category="General"
            />
          }
        ></Route>
        <Route
          path="/Health"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="Health"
              pageSize={pageSize}
              query={query}
              country={country}
              category="Health"
            />
          }
        ></Route>
        <Route
          path="/Science"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="Science"      pageSize={pageSize}
              query={query}
              country={country}
              category="Science"
            />
          }
        ></Route>
        <Route
          path="/Sports"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="Sports"
              pageSize={pageSize}
              query={query}
              country={country}
              category="Sports"
            />
          }
        ></Route>
        <Route
          path="/Technology"
          element={
            <News
              setProgress={setProgress}
              apikey={apikey}
              key="Technology"    
              pageSize={pageSize}
              query={query}
              country={country}
              category="Technology"
            />
          }
        ></Route>
      </Routes>
      </div>
    </>
  );
};

export default App;
