import InputField from "../InputField";
import SubmitButton from "../SubmitButton";

export default function Step3Password({
  password,
  confirmPassword,
  onChange,
  onNext,
  submitting,
  error,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#511f87]/40 via-[#302b63]/40 to-[#0b0b65]/40 backdrop-blur-md shadow-xl"
    >
      <InputField
        label="Password"
        placeholder="*********"
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />

      <InputField
        label="Confirm Password"
        placeholder="*********"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
      />

      {error?.detail && (
        <span className="text-red-500 text-sm">{error.detail}</span>
      )}

      <SubmitButton
        label={submitting ? "Registering..." : "Register"}
        disabled={submitting}
      />
    </form>
  );
}
