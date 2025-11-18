import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AddFlight() {
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000/api";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.departure_time = new Date(data.departure_time).toISOString();
    data.arrival_time = new Date(data.arrival_time).toISOString();

    data.price = Number(data.price);
    data.available_seats = Number(data.available_seats);

    try {
      await axios.post(`${BASE_URL}/flights/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      alert("Flight added successfully!");
      navigate("/admin/flights");
    } catch (err) {
      console.error("Error creating flight:", err.response?.data || err);
      alert("Failed to add flight. Check field values and admin access.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Flight</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-md grid gap-4"
        >
          <input
            type="text"
            placeholder="Flight Number"
            {...register("flight_number")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Airline"
            {...register("airline")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Departure Airport"
            {...register("departure_airport")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Arrival Airport"
            {...register("arrival_airport")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="datetime-local"
            {...register("departure_time")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="datetime-local"
            {...register("arrival_time")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Available Seats"
            {...register("available_seats")}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <select
            {...register("status")}
            className="border border-gray-300 rounded-lg px-4 py-2"
            defaultValue="on-time"
            required
          >
            <option value="on-time">On-time</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md mt-2 transition"
          >
            Save Flight
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
