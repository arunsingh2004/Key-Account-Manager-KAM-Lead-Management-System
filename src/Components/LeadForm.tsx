import React, { useState } from "react";

interface LeadFormProps {
  onSubmit: (data: any) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    status: "new",
    callFrequency: 7,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          className="border border-gray-300 rounded-md p-2 m-4"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <input
          className="border border-gray-300 rounded-md p-2 m-4"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status:
        <select
          className="border border-gray-300 rounded-md p-2 m-4"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="converted">Converted</option>
        </select>
      </label>
      <label>
        Call Frequency (days):
        <input
          className="border border-gray-300 rounded-md p-2 m-4"
          type="number"
          name="callFrequency"
          value={formData.callFrequency}
          onChange={handleChange}
        />
      </label>
      <button className="border bg-yellow-300 rounded-md p-2 m-4" type="submit">
        Save Lead
      </button>
    </form>
  );
};

export default LeadForm;
