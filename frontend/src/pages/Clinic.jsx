import React, { useState, useEffect } from "react";
import "./Clinic.css";
import Header from "./Header";
import Footer from "./Footer";

const Clinic = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Virtual");

  const [verificationKey, setVerificationKey] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch clinics from backend
  useEffect(() => {
    fetch("http://localhost:6000/api/clinics")
      .then((res) => res.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  // Fetch doctors for selected clinic
  const fetchDoctors = (clinicId) => {
    fetch(`http://localhost:6000/api/doctors/${clinicId}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  // Function to verify the entered key
  const verifyKey = () => {
    fetch("http://localhost:6000/api/verify-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clinicId: selectedClinic, verificationKey }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVerificationResult(data.appointment);
          setError("");
        } else {
          setVerificationResult(null);
          setError("Invalid verification key. Please try again.");
        }
      })
      .catch(() => setError("Server error while verifying key."));
  };

  return (
    <div className="clinic-page">
      <Header />

      <div className="clinic-container">
        <h1>Virtual Consultation & Booking System</h1>

        {/* Existing Clinic Selection Section */}
        <h2>Select a Clinic</h2>
        <select
          onChange={(e) => {
            setSelectedClinic(e.target.value);
            fetchDoctors(e.target.value);
          }}
        >
          <option value="">Select a Clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic.ClinicID} value={clinic.ClinicID}>
              {clinic.Name} - {clinic.Location}
            </option>
          ))}
        </select>

        {selectedClinic && (
          <>
            <h2>Select a Doctor</h2>
            <select onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.DoctorID} value={doctor.DoctorID}>
                  {doctor.Name} - {doctor.Specialty}
                </option>
              ))}
            </select>

            <h2>Select an Appointment Time</h2>
            <input
              type="datetime-local"
              onChange={(e) => setAppointmentTime(e.target.value)}
            />

            <h2>Choose Appointment Type</h2>
            <select onChange={(e) => setAppointmentType(e.target.value)}>
              <option value="Virtual">Virtual</option>
              <option value="In-Person">In-Person</option>
            </select>

            <button className="appointment-btn">Book Appointment</button>
          </>
        )}

        {/* New Section: Verification Key Input (Below Everything) */}
        <div className="verification-section">
          <h2>Enter Your Verification Key</h2>
          <input
            type="text"
            placeholder="Enter Verification Key"
            value={verificationKey}
            onChange={(e) => setVerificationKey(e.target.value)}
          />
          <button onClick={verifyKey}>Verify Key</button>

          {error && <p className="error-text">{error}</p>}
          {verificationResult && (
            <div className="appointment-details">
              <h3>Appointment Details</h3>
              <p>
                <strong>Doctor:</strong> {verificationResult.DoctorID}
              </p>
              <p>
                <strong>Time:</strong> {verificationResult.AppointmentTime}
              </p>
              <p>
                <strong>Type:</strong> {verificationResult.Type}
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clinic;
