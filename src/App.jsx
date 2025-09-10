// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
