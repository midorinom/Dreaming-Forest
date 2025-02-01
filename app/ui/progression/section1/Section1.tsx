// "use client";
// import { Section1Props } from "@/app/lib/definitions/progression-definitions";
// import Character from "./Character";
// import GeneralStats from "./GeneralStats";

// export default function Section1({ activeCharacter }: Section1Props) {
//   return (
//     <div className="flex flex-col items-center gap-6">
//       <Character activeCharacter={activeCharacter} />
//       {activeCharacter.progression && activeCharacter.progression.general ? (
//         <GeneralStats activeCharacter={activeCharacter} />
//       ) : (
//         <div className="w-full">
//           <div className="flex justify-between">
//             <span>Stat</span>
//             <span className="w-[30%] bg-white text-center">0</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
