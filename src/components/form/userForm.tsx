import type { User } from "../../types/User";

interface UserFormProps {
  userData: Partial<User>;
  onChange?: (field: string, value: string) => void;
  onSubmit?: (updatedData: Partial<User>) => void;
  readonly?: boolean;
  submitLabel?: string;
}

export default function UserForm({
  userData,
  onChange = () => {},
  onSubmit = () => {},
  readonly = false,
  submitLabel = "Save",
}: UserFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="name"
        value={userData.name || ""}
        disabled={readonly}
        onChange={(e) => onChange("name", e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={userData.email || ""}
        disabled={readonly}
        onChange={(e) => onChange("email", e.target.value)}
      />

      <label htmlFor="gender">Gender</label>
      <input
        id="gender"
        name="gender"
        value={userData.gender || ""}
        disabled={readonly}
        onChange={(e) => onChange("gender", e.target.value)}
      />

      <label htmlFor="status">Status</label>
      <input
        id="status"
        name="status"
        value={userData.status || ""}
        disabled={readonly}
        onChange={(e) => onChange("status", e.target.value)}
      />

      {!readonly && (
        <button type="submit" className="button">
          {submitLabel}
        </button>
      )}
    </form>
  );
}
