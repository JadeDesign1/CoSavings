import { editUserProfile } from "@/actions/page";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const EditProfileModal = ({ user, onClose, onProfileUpdated }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");

    const { error, data } = await editUserProfile({ name, email: user.email });

    if (data) {
      toast.success("profile updated successfully");
      redirect("/home");
    }
    if (error) {
      console.error("Failed to update profile", error);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4 animate-fadeInUp">
        <h3 className="text-lg font-semibold">Edit Profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            defaultValue={user.full_name || ""}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            className="w-full bg-gray-200 p-2 rounded"
            placeholder="Email"
            disabled
          />

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
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
