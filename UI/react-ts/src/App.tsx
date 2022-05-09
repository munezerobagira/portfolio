import "./App.css";
import routes from "./pages";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ Component, id, path }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
}

export default App;

