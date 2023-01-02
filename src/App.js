import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout style={{ height: "100vh" }}>
          <NavBar />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
