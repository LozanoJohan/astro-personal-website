import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  try {
    const db = getFirestore(app);
    const usersRef = db.collection("subscribedUsers");

    const userQuery = usersRef.where("email", "==", email);
    const querySnapshot = await userQuery.get();

    if (!querySnapshot.empty) {
      // User with the given email exists
      return new Response(
        JSON.stringify({
          message: "Ya estás apuntado, gracias 👍",
        }),
        { status: 400 },
      );
    } else {
      // User with the given email does not exist
      await usersRef.add({ name, email });
      return new Response(
        JSON.stringify({
          message: `${name}, te suscribiste exitosamente 🥳`,
        }),
        { status: 200 },
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Algo salió mal 😢",
        error,
      }),
      { status: 500 },
    );
  }
};
