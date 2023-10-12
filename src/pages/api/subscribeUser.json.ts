import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {

  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  if (!name || !email) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos 😢",
      }),
      { status: 400 },
    );
  }
  try {
    const db = getFirestore(app);
    const usersRef = db.collection("subscribedUsers");

    const user = usersRef.where("email", "==", email)

    // Execute the query
    user.get()
      .then((querySnapshot) => {

        if (!querySnapshot.empty) {
          // User with the given email exists
          return new Response(
            JSON.stringify({
              message: "Ya estás apuntado 👍",
            }),
            { status: 400 },
          );
        } else {
          // User with the given email does not exist
          usersRef.add({ name, email }).then((docRef) => {
            return new Response(
              JSON.stringify({
                message: "Te subscribiste exitosamente 🥳",
              }),
              { status: 200 },
            );
          })
            .catch((error) => {
              return new Response(
                JSON.stringify({
                  message: error,
                }),
                { status: 500 },
              );
            });
        }
      })
      .catch((error) => {
        new Response(
          JSON.stringify({
            message: error,
          }),
          { status: 500 },
        );
      });
  } catch (error) {

    return new Response(
      JSON.stringify({
        message: "Algo salio mal 😢", error,
      }),
      { status: 500 },
    );
  }
  return new Response(
    JSON.stringify({
      message: "Te has subscrito exitosamente 🥳",
    }),
    { status: 200 },
  );
};
