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
    const matchesType =
      filterType === "Both" || event.type === filterType;
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
      {/* Header & Search */}
      <div className="container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between px-3 py-3">
        <h1 className="text-danger mb-3 mb-md-0" style={{ fontSize: "1.5rem", fontWeight: 500 }}>
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

      <hr className="container" />

      {/* Filter */}
      <div className="container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between px-3 py-3 mb-3">
        <h2 className="fw-bold mb-2 mb-md-0">MeetUp Events</h2>
        <div className="w-100 w-md-auto">
          <select
            className="form-select rounded p-1 text-secondary"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="Both">Select Event Type</option>
            <option value="Online Event">Online Event</option>
            <option value="Offline Event">Offline Event</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="container">
        <div className="row g-3 justify-content-center">
          {filteredEvents.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
              <Link
                to={`/events/${event._id}`}
                className="text-decoration-none text-dark"
              >
                {/* Image Card */}
                <div
                  className="card"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="img-fluid"
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                  <span
                    className="position-absolute"
                    style={{
                      top: "10px",
                      left: "10px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 500
                    }}
                  >
                    {event.type}
                  </span>
                </div>

                {/* Event Info */}
                <div className="mt-2">
                  <small className="text-muted d-block">
                    {new Date(event.date).toDateString()} •{" "}
                    {new Date(event.date).toLocaleTimeString("en-US")} IST
                  </small>
                  <h6 className="fw-bold fs-5">{event.title}</h6>
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
