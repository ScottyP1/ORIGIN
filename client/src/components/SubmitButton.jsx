const SubmitButton = ({ label, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-4 justify-center cursor-target mt-2 px-6 py-3 rounded-xl font-[Mokoto] tracking-wide bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg"
    >
      {icon && icon} {label}
    </button>
  );
};

export default SubmitButton;
