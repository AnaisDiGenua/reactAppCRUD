import { useState } from "react";
import type { User } from "../../types/User";
import { createUserFetch } from "../../api/userApi";
import "./user-registration.css";

export default function UserRegistration() {
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const handleFieldChange = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUserFetch(newUser);

      if (response) {
        setNewUser({
          name: "",
          email: "",
          gender: "",
          status: "",
        });
      }
      alert("User created");
    } catch {
      alert("Error during registration");
    }
  };

  return (
    <div className="create-box">
      <h2>Create New User</h2>

      <form onSubmit={handleCreate}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={newUser.name || ""}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={newUser.email || ""}
          onChange={(e) => handleFieldChange("email", e.target.value)}
        />

        <label htmlFor="gender">Gender</label>
        <input
          id="gender"
          name="gender"
          value={newUser.gender || ""}
          onChange={(e) => handleFieldChange("gender", e.target.value)}
        />

        <label htmlFor="status">Status</label>
        <input
          id="status"
          name="status"
          value={newUser.status || ""}
          onChange={(e) => handleFieldChange("status", e.target.value)}
        />

        <button type="submit" className="button">
          Create User
        </button>
      </form>
    </div>
  );
}
