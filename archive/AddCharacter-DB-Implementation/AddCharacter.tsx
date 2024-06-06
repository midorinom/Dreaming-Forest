// "use client";
// import { useFormState } from "react-dom";
// import Image from "next/image";
// import { submitCharacter } from "@/app/lib/actions/first-timer-actions";

// export default function AddCharacter() {
//   const fileUploaded = true;
//   const initialState = { message: "", errors: {} };
//   const [state, action] = useFormState(submitCharacter, initialState);

//   return (
//     <form
//       className="grid grid-cols-2 grid-rows-3 gap-4 items-center"
//       action={action}
//     >
//       {fileUploaded && (
//         <Image
//           src="/naked_char.png"
//           height={0}
//           width={0}
//           alt="Naked Character"
//           sizes="100vw"
//           className="w-1/3 h-auto row-span-2 justify-self-center"
//         />
//       )}
//       <input
//         type="file"
//         className={`file-input file-input-bordered file-input-accent w-4/5 max-w-xs col-start-1 row-span-${
//           fileUploaded ? "1" : "3"
//         } justify-self-center`}
//       />
//       <label className="input input-bordered flex items-center gap-2 col-start-2 row-start-1 w-4/5">
//         IGN
//         <input type="text" className="grow" />
//       </label>
//       <div id="ign-error" aria-live="polite" aria-atomic="true">
//         {state.errors?.ign &&
//           state.errors.ign.map((error: string) => (
//             <p className="mt-2 text-sm text-red-500" key={error}>
//               {error}
//             </p>
//           ))}
//       </div>
//       <label className="input input-bordered flex items-center gap-2 col-start-2 row-start-2 w-1/3">
//         Lv
//         <input type="text" className="grow" />
//       </label>
//       <label className="input input-bordered flex items-center gap-2 col-start-2 row-start-3 w-4/5">
//         Class
//         <input type="text" className="grow" />
//       </label>
//       <button type="submit">Submit</button>
//       <div>{state.message}</div>
//     </form>
//   );
// }
