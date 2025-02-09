import React, { useState, useEffect } from "react";
import "./Clinic.css";
import Header from "./Header";
import Footer from "./Footer";

const Clinic = () => {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Virtual");

  // Fetch clinics
  useEffect(() => {
    fetch("http://localhost:3000/api/clinics")
      .then((res) => res.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  // Fetch doctors for selected clinic
  const fetchDoctors = (clinicId) => {
    fetch(`http://localhost:3000/api/doctors/${clinicId}`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  // Fetch user appointments
  useEffect(() => {
    const userId = "12345"; // Replace with actual user ID
    fetch(`http://localhost:3000/api/appointments/${userId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Handle appointment booking
  const bookAppointment = () => {
    const userId = "12345"; // Replace with actual user ID
    if (!selectedClinic || !selectedDoctor || !appointmentTime) {
      alert("Please select a clinic, doctor, and appointment time.");
      return;
    }

    fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        clinicId: selectedClinic,
        doctorId: selectedDoctor,
        appointmentTime,
        type: appointmentType,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Appointment booked successfully!");
      })
      .catch((error) => console.error("Error booking appointment:", error));
  };

  return (
    <div className="clinic-page">
      <Header />

      <div className="clinic-container">
        <h1>Virtual Consultation & Booking System</h1>

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
              {clinic.Name}
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
                  {doctor.Name}
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

            <button onClick={bookAppointment}>Book Appointment</button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Clinic;
