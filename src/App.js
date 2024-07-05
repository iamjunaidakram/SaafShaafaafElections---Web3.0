import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import LeadersDetails from "./container/components/LeadersDetail/index";
import CastVote from "./container/components/CasteYourVote/index";
import Admin from "./container/components/Admin/index";
import Main from "./container/index";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1>SaafShaafaafElections</h1>
          </Link>

          <Link to="/admin">
            <button className="admin-btn">Nadra</button>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/leaders-details" element={<LeadersDetails />} />
          <Route path="/cast-vote" element={<CastVote />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
