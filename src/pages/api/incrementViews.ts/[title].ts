import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ params }) => {
  const { title } = params; // Obtiene el ID de la página de los parámetros de la URL
console.log("a");

console.log("title");

  try {
    const db = getFirestore(app);
    // Usamos una consulta para encontrar el post por título ya que Firestore no permite usar títulos como ID directamente
    const pagesRef = db.collection('pages');
    const snapshot = await pagesRef.where('title', '==', title).get();

    if (snapshot.empty) {
      // Crear un nuevo documento si el post no existe
      const newDocRef = await pagesRef.add({ title, views: 1 });
      return new Response(JSON.stringify({ views: 1 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Actualizar el documento existente
      const doc = snapshot.docs[0];
      const currentViews = doc.data().views;
      await doc.ref.update({ views: currentViews + 1 });
      return new Response(JSON.stringify({ views: currentViews + 1 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Algo salió mal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};