"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSidebar from "@/Components/LeftSidebar";

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    role: "",
    contactInfo: "",
  });

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/Admin/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Add new contact
  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const leadId = "63a0f25d4e824b1234abcdef"; // Replace with dynamic or actual leadId
    try {
      await axios.post("/api/Admin/contacts", { ...newContact, leadId });
      setNewContact({ name: "", role: "", contactInfo: "" });
      fetchContacts();
    } catch (error: any) {
      console.error(
        "Error adding contact:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.error || "Failed to add contact");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex flex-1 bg-gray-100">
      <LeftSidebar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 w-full md:w-4/5">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
          Contact Management
        </h1>

        <form onSubmit={addContact} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              placeholder="Contact Name"
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
            <input
              type="text"
              name="role"
              value={newContact.role}
              onChange={(e) =>
                setNewContact({ ...newContact, role: e.target.value })
              }
              placeholder="Role (e.g., Manager)"
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="contactInfo"
              value={newContact.contactInfo}
              onChange={(e) =>
                setNewContact({ ...newContact, contactInfo: e.target.value })
              }
              placeholder="Contact Info (Phone or Email)"
              className="w-full border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Add Contact
          </button>
        </form>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact: any) => (
              <div
                key={contact._id}
                className="p-6 border-2 border-gray-300 rounded-lg bg-white shadow-md hover:shadow-xl transition duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  {contact.name}
                </h3>
                <p className="text-gray-600">{contact.role}</p>
                <p className="text-gray-500">{contact.contactInfo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
