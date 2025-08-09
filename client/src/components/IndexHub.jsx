import { FiGithub } from "react-icons/fi";

const IndexHub = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 gap-24 p-6 rounded-4xl bg-gradient-to-br from-[#511f87]/[.5] via-[#302b63]/[.5] to-[#0b0b65]/[.5]">
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">
            Commits
          </h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">Merges</h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">Forks</h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">Clones</h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">PRs</h1>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <FiGithub color="grey" size={100} />
          <h1 className="text-gray-400 font-[Mokoto] tracking-[3px]">
            Problems
          </h1>
        </div>
      </div>
    </div>
  );
};

export default IndexHub;
