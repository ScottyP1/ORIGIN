const InputField = ({
  label,
  type,
  placeholder,
  name,
  onChange,
  passwordError,
}) => {
  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-sm tracking-wider">{label}</label>
      <input
        name={name}
        type={type}
        className={`cursor-target px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          passwordError && "border-2 border-red-500"
        }`}
        placeholder={placeholder}
        onChange={onChange}
      />
      {passwordError && name === "confirmPassword" && (
        <span className="text-sm absolute inset-0 top-20 text-red-400">
          {passwordError}
        </span>
      )}
    </div>
  );
};

export default InputField;
