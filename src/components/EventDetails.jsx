import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://meetup-app-backend-chi.vercel.app/events/${id}`);
        if (!response.ok) throw new Error("Event not found");
        const data = await response.json();
        setEvent(data.event);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (isLoading)
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading event details...</p>
      </div>
    );

  if (isError || !event)
    return (
      <div className="container text-center mt-5 alert alert-danger">
        Event details could not be found.
      </div>
    );

  const {
    title,
    description,
    sessions,
    speakers,
    price,
    venue,
    tags,
    dressCode,
    ageRestriction,
    thumbnailUrl,
  } = event;

  const startDate = new Date(sessions[0].startTime);
  const endDate = new Date(sessions[0].endTime);

  const formattedStartTime = startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" });
  const formattedEndTime = endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" });

  const formattedStartDate = startDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" });
  const formattedEndDate = endDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" });

  const formattedDateTime = `${formattedStartDate} at ${formattedStartTime} to ${formattedEndDate} ${formattedEndTime}`;
  const host = speakers.find((speaker) => speaker.isHost);

  return (
    <div style={{ backgroundColor: "#dee2e6", minHeight: "100vh" }}>
      {/* Header */}
      <div className="container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between px-3 py-3">
        <Link to="/" className="text-decoration-none mb-3 mb-md-0">
          <h1 className="text-danger" style={{ fontSize: "1.5rem", fontWeight: 500 }}>Meetup</h1>
        </Link>
        <div className="position-relative w-100 w-md-auto" style={{ maxWidth: "220px" }}>
          <i className="bi bi-search position-absolute" style={{ left: "10px", top: "50%", transform: "translateY(-50%)" }}></i>
          <input type="search" className="form-control rounded ps-5 text-secondary" placeholder="Search by title..." readOnly />
        </div>
      </div>

      <hr className="container" />

      <div className="container my-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-12 col-md-8">
            <h1 className="fw-bold mb-3">{title}</h1>
            <p className="text-muted fs-5">
              Hosted By: <br />
              <span className="fw-bold">{host ? host.role : "Not Assigned"}</span>
            </p>
            <img src={thumbnailUrl} alt={title} className="img-fluid rounded mb-4" />

            <div className="mb-4">
              <h2 className="fw-bold fs-4">Details:</h2>
              <p className="lead">{description}</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-bold fs-4">Additional Information:</h2>
              <p><strong>Dress Code:</strong> {dressCode}</p>
              <p><strong>Age Restrictions:</strong> {ageRestriction}</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-bold fs-4">Event Tags:</h2>
              {tags.map((tag) => <span key={tag} className="badge bg-danger rounded-pill me-2 mb-1">{tag}</span>)}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            <div className="card p-3 mb-4">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-clock me-2 fs-4 text-muted"></i>
                <p className="mb-0">{formattedDateTime}</p>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-geo-alt me-2 fs-4 text-muted"></i>
                <div>
                  <p className="mb-0 fw-bold">{venue.name}</p>
                  <small className="text-muted">{venue.address}, {venue.city}</small>
                </div>
              </div>
              <div className="d-flex align-items-center mb-0">
                <i className="bi bi-cash me-2 fs-4 text-muted"></i>
                <p className="mb-0 fw-bold">₹ {price.amount}</p>
              </div>
            </div>

            {/* Speakers */}
            <h5 className="fw-bold mb-3">Speakers ({speakers.length})</h5>
            <div className="row">
              {speakers.map((speaker) => {
                const { name, role, photoUrl } = speaker;
                const [firstName, lastName] = name.split(" ");
                const speakerProfileUrl = photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=100`;

                return (
                  <div key={name} className="col-6 mb-3">
                    <div className="card text-center p-2">
                      <img src={speakerProfileUrl} alt={name} className="rounded-circle mx-auto mt-2" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                      <div className="card-body p-0 pt-2">
                        <p className="mb-0 fw-bold">{name}</p>
                        <small className="text-muted">{role}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
