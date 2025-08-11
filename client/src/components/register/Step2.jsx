import InputField from "../InputField";
import SubmitButton from "../SubmitButton";

export default function Step2Code({
  email,
  code,
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
      <p className="text-sm text-gray-300">
        We sent a 6-digit code to <strong>{email}</strong>.
      </p>

      <InputField
        label="Verification Code"
        placeholder="123456"
        type="text"
        name="code"
        value={code}
        onChange={onChange}
      />

      {error && (
        <span className="text-red-500 text-sm text-center">{error.error}</span>
      )}

      <SubmitButton
        label={submitting ? "Verifying..." : "Verify Code"}
        disabled={submitting}
      />
    </form>
  );
}
