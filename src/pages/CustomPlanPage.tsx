// src/pages/CustomPlanPage.tsx
import { useState } from "react";

const CustomPlanPage = () => {
  const [planName, setPlanName] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Plan Created!\nName: ${planName}\nFamily Members: ${familyMembers}\nEmergency Contact: ${emergencyContact}`);
    setPlanName("");
    setFamilyMembers("");
    setEmergencyContact("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Custom Preparedness Plan</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Plan Name</label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Family Emergency Plan"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Family Members</label>
          <input
            type="text"
            value={familyMembers}
            onChange={(e) => setFamilyMembers(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. John, Sarah, Mike"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Emergency Contact</label>
          <input
            type="text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. +1 234 567 890"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300 font-semibold"
        >
          Save Plan
        </button>
      </form>
    </div>
  );
};

export default CustomPlanPage;
