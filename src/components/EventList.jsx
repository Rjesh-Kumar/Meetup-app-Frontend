import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Header & Search */}
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-3 py-3 w-100 container">
        <h1 className="text-danger fs-5 fw-bold mb-3 mb-md-0">Meetup</h1>
        <div className="w-100 w-md-auto position-relative">
          <i
            className="bi bi-search"
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          ></i>
          <input
            type="search"
            className="rounded ps-5 text-secondary w-100"
            placeholder="Search by title and t..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", boxShadow: "none" }}
          />
        </div>
      </div>

      <hr className="container" />

      {/* Filter */}
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-3 py-3 w-100 container">
        <h2 className="fw-bold mb-3 mb-md-0">MeetUp Events</h2>
        <div className="w-100 w-md-auto position-relative">
          <select
            className="rounded p-2 text-secondary w-100 w-md-auto"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ border: "none", boxShadow: "none" }}
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
        <div className="row g-4 justify-content-center">
          {filteredEvents.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
              >
                <div
                  className="card"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    className="position-absolute top-0 start-0 m-2 bg-white text-black px-2 py-1 rounded-pill fw-bold"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="mt-2">
                  <small className="text-muted">
                    {new Date(event.date).toDateString()} •{" "}
                    {new Date(event.date).toLocaleTimeString("en-US")} IST
                  </small>
                  <h6 className="mt-1 fw-bold fs-5">{event.title}</h6>
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