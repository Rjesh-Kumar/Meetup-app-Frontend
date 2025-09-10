import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Both");

  useEffect(() => {
    fetch("https://meetup-app-backend-chi.vercel.app/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch((err) => console.error(err));
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesType = filterType === "Both" || event.type === filterType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.tags &&
        event.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: "#dee2e6", minHeight: "100vh" }}>
      <div className="container py-3">
        {/* Header & Search */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3">
          <h1 className="text-danger mb-2 mb-md-0" style={{ fontSize: "1.5rem", fontWeight: 500 }}>
            Meetup
          </h1>
          <div className="position-relative w-100 w-md-auto" style={{ maxWidth: "220px" }}>
            <i
              className="bi bi-search position-absolute"
              style={{ left: "10px", top: "50%", transform: "translateY(-50%)" }}
            ></i>
            <input
              type="search"
              className="form-control rounded ps-5 text-secondary"
              placeholder="Search by title and tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <hr />

        {/* Filter */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3">
          <h2 className="fw-bold mb-2 mb-md-0">MeetUp Events</h2>
          <select
            className="form-select text-secondary w-100 w-md-auto"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="Both">Select Event Type</option>
            <option value="Online Event">Online Event</option>
            <option value="Offline Event">Offline Event</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Event Cards */}
        <div className="row g-3 justify-content-center">
          {filteredEvents.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
              <Link to={`/events/${event._id}`} className="text-decoration-none text-dark">
                <div className="card" style={{ width: "100%", maxWidth: "250px", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="img-fluid"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-0 bg-white text-dark px-2 py-1 rounded-end">
                    {event.type}
                  </span>
                  <div className="p-2">
                    <small className="text-muted">
                      {new Date(event.date).toDateString()} • {new Date(event.date).toLocaleTimeString("en-US")} IST
                    </small>
                    <h6 className="fw-bold mt-1">{event.title}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;