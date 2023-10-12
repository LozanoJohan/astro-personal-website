import { useState } from "react";

export const SubscribeForm = () => {

    const [message, setMessage] = useState("")

    async function submit(e) {
        setMessage("");


        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch("/api/subscribeUser", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setMessage(data.message);
    }

    return (
        <>
            <h1 className="text-3xl mt-10 mb-3">¿Fue útil? Subscribete a mi blog</h1>

            <form onSubmit={submit} method="POST" className="flex flex-col pb-10">
                <input
                    className="px-3 text-black py-2 mx-auto my-2 w-full text-center"
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Tu nombre"
                />
                <input
                    className="px-3 text-black py-2 mx-auto my-2 w-full text-center"
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Tu email"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto my-2 w-[300px]">
                    Suscríbete
                </button>
                {message && <p className="text-center">{message}</p>}
            </form>
        </>
    )
}