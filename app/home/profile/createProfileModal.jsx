"use client";
import { createUserProfile } from "@/actions/page";
import { useState } from "react";

const CreateProfileModal = ({ userId, userEmail, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await createUserProfile({
        id: userId,
        name: formData.name,
        email: formData.email,
      });

      if (error) {
        setErrorMsg("Failed to create profile. Please try again.");
        console.error("Error:", error);
        return;
      }

      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/80 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4 animate-fadeInUp">
        <h3 className="text-lg font-semibold">Setup Your Profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Email"
            disabled
          />

          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfileModal;
