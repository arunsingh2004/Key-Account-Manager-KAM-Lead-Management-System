"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LeadForm from "@/Components/LeadForm";
import LeftSidebar from "@/Components/LeftSidebar";
const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const response = await axios.get("/api/Admin/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const addLead = async (data: any) => {
    try {
      await axios.post("/api/Admin/leads", data);
      fetchLeads();
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="flex flex-1">
      <LeftSidebar />
      <>
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
              Leads Management
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Add Lead
              </h2>
              <LeadForm onSubmit={addLead} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Leads List
              </h2>
              {leads.length > 0 ? (
                <ul className="space-y-4">
                  {leads.map((lead: any) => (
                    <li
                      key={lead.id}
                      className="p-4 bg-gray-50 rounded-lg shadow flex items-center justify-between"
                    >
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {lead.name}
                        </p>
                        <p className="text-sm text-gray-500">{lead.status}</p>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:underline">
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No leads found.</p>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LeadsPage;
