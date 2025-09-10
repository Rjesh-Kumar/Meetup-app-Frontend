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
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between px-3 py-3 container">
        <h1
          style={{
            color: "red",
            fontSize: "1.5rem",
            fontWeight: "500",
            margin: 0,
          }}
        >
          Meetup
        </h1>
        <div className="mt-2 mt-md-0 w-100 w-md-auto position-relative">
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
            placeholder="Search by title and tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", boxShadow: "none" }}
          />
        </div>
      </div>

      <hr className="container" />

      {/* Filter */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between px-3 py-3 container">
        <h2 className="fw-bold">MeetUp Events</h2>
        <div className="mt-2 mt-md-0" style={{ minWidth: "200px" }}>
          <select
            className="form-select text-secondary"
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
            <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                className="w-100"
              >
                {/* Image Card */}
                <div
                  className="card w-100"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={event.thumbnailUrl}
                    alt=""
                    className="w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                    }}
                  >
                    {event.type}
                  </span>
                </div>

                {/* Event Info */}
                <div className="mt-2 px-2">
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
