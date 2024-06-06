// "use server";
// import { z } from "zod";
// import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// const FormSchema = z.object({
//   id: z.string(),
//   ign: z.string({
//     invalid_type_error: "Please select a customer.",
//   }),
//   level: z.coerce
//     .number()
//     .gt(0, { message: "Please enter an amount greater than $0." }),
//   class_name: z.enum(["pending", "paid"], {
//     invalid_type_error: "Please select an invoice status.",
//   }),
// });

// const SubmitCharacter = FormSchema.omit({ id: true });

// type FormState = {
//   errors?: {
//     ign?: string[];
//     level?: string[];
//     class_name?: string[];
//   };
//   message?: string;
// };

// export async function submitCharacter(
//   prevState: FormState,
//   formData: FormData
// ) {
//   // Validate form fields using Zod
//   const validatedFields = SubmitCharacter.safeParse({
//     ign: formData.get("ign"),
//     level: formData.get("level"),
//     class_name: formData.get("class_name"),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     };
//   }

//   // Prepare data for insertion into the database
//   const { ign, level, class_name } = validatedFields.data;

//   // Insert data into the database
//   try {
//     await sql`
//         INSERT INTO characters (ign, level, class_name)
//         VALUES (${ign}, ${level}, ${class_name})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to Create Invoice.",
//     };
//   }

//   revalidatePath("/");
//   redirect("/");
// }
