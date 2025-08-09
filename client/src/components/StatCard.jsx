const StatCard = ({ title, value }) => {
  return (
    <div className="cursor-target bg-black/30 border border-gray-600  backdrop-blur-md p-6 rounded-xl text-white text-center shadow-md hover:scale-105 transform transition duration-300 font-[Mokoto]">
      <h3 className="text-md text-gray-400 mb-1">{title}</h3>
      <p className="text-4xl">{value}</p>
    </div>
  );
};

export default StatCard;
