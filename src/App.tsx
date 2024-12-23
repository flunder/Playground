import React, { lazy, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const PLAYGROUNDS = [
  lazy(() => import("./playgrounds/1")),
  lazy(() => import("./playgrounds/2")),
  lazy(() => import("./playgrounds/3")),
  lazy(() => import("./playgrounds/4")),
  lazy(() => import("./playgrounds/5")),
  lazy(() => import("./playgrounds/6")),
  lazy(() => import("./playgrounds/7")),
  lazy(() => import("./playgrounds/8")),
  lazy(() => import("./playgrounds/9")),
  lazy(() => import("./playgrounds/10")),
  lazy(() => import("./playgrounds/11"))
];

const App = () => {
  const Pages = useRef(
    PLAYGROUNDS.map((Playground, i) => (
      <Route key={i} path={(i + 1).toString()} element={<Playground />} />
    ))
  ).current;

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>{...Pages}</Routes>
    </BrowserRouter>
  );
};

export default App;
