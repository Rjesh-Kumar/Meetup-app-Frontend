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
      <div className="d-flex align-items-center justify-content-between px-3 py-3 w-100 container">
        <h1 style={{ color: "red", fontSize: "1.5rem", fontWeight: "500", margin: 0 }}>
          Meetup
        </h1>
        <div style={{ width: "220px", position: "relative", marginRight: "10px" }}>
          <i
            className="bi bi-search"
            style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
          ></i>
          <input
            type="search"
            className="rounded ps-5 text-secondary"
            placeholder="Search by title and t..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", boxShadow: "none"}}
          />
        </div>
      </div>

      <hr className="container" />

      {/* Filter */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3 w-100 container">
        <h2 className="fw-bold">MeetUp Events</h2>
        <div style={{ width: "200px", position: "relative", marginLeft: "10px" }}>
          <select
            className="rounded p-1 text-secondary"
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
        <div className="row g-3">
          {filteredEvents.map((event) => (
            <div key={event._id} className="col-lg-4">
              {/* Entire card + info wrapped in Link */}
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
              >
                {/* Image Card */}
                <div
                  className="card ms-5"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  <img
                    src={event.thumbnailUrl}
                    alt=""
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
                      fontWeight: "500"
                    }}
                  >
                    {event.type}
                  </span>
                </div>

                {/* Event Info */}
                <div style={{ marginTop: "4px", paddingLeft: "4px" }} className="ms-5">
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
