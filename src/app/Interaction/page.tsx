"use client";
import React, { useState } from "react";
import axios from "axios";
import LeftSidebar from "@/Components/LeftSidebar";

const CallTrackingForm: React.FC = () => {
  const [leadId, setLeadId] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async () => {
    await axios.post("/api/Admin/Interaction", {
      leadId,
      interactionType: "Call",
      details,
      date: new Date(),
    });
    alert("Call interaction recorded!");
    setLeadId("");
    setDetails("");
  };

  return (
    <div className="flex flex-1">
      <LeftSidebar />
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Record a Call
          </h3>
          <div className="mb-4">
            <label
              htmlFor="leadId"
              className="block text-sm font-medium text-gray-700"
            >
              Lead ID
            </label>
            <input
              id="leadId"
              type="text"
              placeholder="Enter Lead ID"
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Call Details
            </label>
            <textarea
              id="details"
              placeholder="Enter Call Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallTrackingForm;
