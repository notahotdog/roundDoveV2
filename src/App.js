import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import FacilitateWorkshopPage from "./components/FacilitateWorkshopPage";
import WorkshopCreationPage from "./components/WorkshopCreationPage";
import EditWorkshop from "./components/EditWorkshopPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Layout style={{ height: "100vh" }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route
              path="/FacilitateWorkshopPage"
              element={<FacilitateWorkshopPage />}
              exact
            />
            <Route
              path="/WorkshopCreationPage"
              element={<WorkshopCreationPage />}
              exact
            />
            <Route
              path="/WorkshopCreationPage/EditWorkshop/:id"
              exact
              // component={EditWorkshop}
              element={<EditWorkshop />}
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
