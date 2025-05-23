"use client";
import { useEffect, useState } from "react";
import EditProfileModal from "./editProfileModal";

const ProfileCard = ({ userProfile }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [5000]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl h-[250px] shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">My Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <p className="capitalize">
              <strong>Name:</strong> {userProfile?.full_name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userProfile?.email || "N/A"}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Edit Profile
          </button>
        </>
      )}

      {isModalOpen && userProfile && (
        <EditProfileModal
          user={userProfile}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileCard;
