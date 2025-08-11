import InputField from "../InputField";
import SubmitButton from "../SubmitButton";

export default function Step1Email({
  email,
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
        label="Email"
        placeholder="you@example.com"
        type="email"
        name="email"
        value={email}
        onChange={onChange}
      />

      {error?.detail && (
        <span className="text-red-500 text-sm">{error.detail}</span>
      )}

      <SubmitButton
        label={submitting ? "Sending..." : "Send Verification Code"}
        disabled={submitting}
      />
    </form>
  );
}
