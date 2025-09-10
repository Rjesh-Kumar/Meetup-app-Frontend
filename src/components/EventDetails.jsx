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
        const response = await fetch(`https://meetup-app-backend-chi.vercel.app/${id}`);
        if (!response.ok) {
          throw new Error("Event not found");
        }
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

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (isError || !event) {
    return <div className="container text-center mt-5 alert alert-danger">Event details could not be found.</div>;
  }

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

  const formattedStartTime = startDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // Added seconds
      timeZone: 'Asia/Kolkata'
  });
  const formattedEndTime = endDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit', // Added seconds
      timeZone: 'Asia/Kolkata'
  });
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
  });
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
  });

  const formattedDateTime = `${formattedStartDate} at ${formattedStartTime} to 
  ${formattedEndDate} ${formattedEndTime}`;
  const host = speakers.find(speaker => speaker.isHost);


  return (
    <div style={{ backgroundColor: "#dee2e6", minHeight: "100vh" }}>
      {/* Header & Search */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3 w-100 container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "red", fontSize: "1.5rem", fontWeight: "500", margin: 0 }}>
            Meetup
          </h1>
        </Link>
        <div style={{ width: "220px", position: "relative", marginRight: "10px" }}>
          <i
            className="bi bi-search"
            style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
          ></i>
          <input
            type="search"
            className="rounded ps-5 text-secondary"
            placeholder="Search by title and t..."
            readOnly
            style={{ border: "none", boxShadow: "none" }}
          />
        </div>
      </div>

      <hr className="container" />
      
      <div className="container my-5">
        <div className="row">
          {/* Left column for image and details */}
          <div className="col-md-8">
            <h1 className="fw-bold mb-3">{title}</h1>
           
<p className="text-muted fs-5">
  Hosted By: <br />
  <span className="fw-bold">
    {host ? `${host.role}` : "Not Assigned"}
  </span>
</p>
            <img src={thumbnailUrl} alt={title} className="img-fluid rounded mb-4" />

            {/* Details Section */}
            <div className="mb-4">
              <h2 className="fw-bold fs-4">Details:</h2>
              <p className="lead">{description}</p>
            </div>

            {/* Additional Information Section */}
            <div className="mb-4">
              <h2 className="fw-bold fs-4">Additional Information:</h2>
              <p><strong>Dress Code:</strong> {dressCode}</p>
              <p><strong>Age Restrictions:</strong> {ageRestriction}</p>
            </div>

            {/* Event Tags Section */}
            <div className="mb-4">
              <h2 className="fw-bold fs-4">Event Tags:</h2>
              {tags.map((tag) => (
                <span key={tag} className="badge bg-danger rounded-pill me-2">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right column for key info and speakers */}
          <div className="col-md-4">
            <div className="card p-4" style={{ top: "25px" }}>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-clock me-2 fs-4 text-muted"></i>
                <div>
                  <p className="mb-0">{formattedDateTime}</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-geo-alt me-2 fs-4 text-muted"></i>
                <div>
                  <p className="mb-0 fw-bold">{venue.name}</p>
                  <small className="text-muted">{venue.address}, {venue.city}</small>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-cash me-2 fs-4 text-muted"></i>
                <p className="mb-0 fw-bold">₹ {price.amount}</p>
              </div>
            </div>
           {/* Speakers Section */}
            <h5 className="fw-bold mb-3 mt-5">Speakers: ({speakers.length})</h5>
            <div className="row">
                  {speakers.map((speaker) => {
                  const { name, role, photoUrl } = speaker;
                  const [firstName, lastName] = name.split(" ");
                  const speakerProfileUrl =
                  photoUrl ||
                  `https://ui-avatars.com/api/?name=${firstName || ""}+${lastName || ""}&background=random&size=100`;

            return (
                  <div key={name} className="col-6 mb-3">
                    <div className="card text-center p-2">
                      <img
                       src={speakerProfileUrl}
                       alt={name}
                       className="rounded-circle mx-auto mt-2"
                       style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
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