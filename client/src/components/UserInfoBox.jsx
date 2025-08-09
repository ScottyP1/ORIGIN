// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import UserFrame from "../assets/userFrame.png";

// const UserInfoBox = () => {
//   const { user, trackedRepos, githubRepos } = useContext(AuthContext);

//   return (
//     <div className="font-[Mokoto] text-white text-lg">
//       <div className="relative w-[700px] h-[400px]">
//         <img
//           src={UserFrame}
//           alt="frame"
//           className="absolute inset-0 object-contain pointer-events-none select-none"
//         />

//         <div className="z-10 flex flex-col items-center justify-center h-full text-center">
//           <div className="flex gap-4 items-center">
//             <span className="text-xl">Github Status</span>
//             <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse" />
//           </div>
//           <div className="w-full p-4 rounded-xl flex flex-col gap-4 items-start pl-24">
//             <InfoSpan title="User" data={user.username} />
//             <InfoSpan title="Tracked Repos" data={trackedRepos.length} />
//             <InfoSpan title="GitHub Repos" data={githubRepos.length} />
//             <InfoSpan title="Repo Issues" data={0} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfoBox;

// const InfoSpan = ({ title, data }) => {
//   return (
//     <div className="text-gray-200">
//       <span className="text-gray-400">{title}: </span>
//       {data}
//     </div>
//   );
// };
