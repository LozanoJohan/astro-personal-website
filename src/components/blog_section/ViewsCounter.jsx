import React, { useEffect, useState } from 'react';

export const ViewsCounter = ({ page }) => {
    const [views, setViews] = useState();

        useEffect(() => {
            // Esta función actualiza las vistas de la página
            const updatePageViews = async () => {
                try {
                    const response = await fetch(`/api/incrementViews/${page}`, {
                        method: 'POST'
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setViews(data.views)
                    } else {
                        throw new Error(data.error || 'Error al actualizar las vistas');
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            updatePageViews();
        }, [page]); // Dependencias del efecto, para que solo se ejecute cuando el pageId cambie

    // Renderiza nada porque este componente solo se encarga de la lógica de actualización de vistas
    return <p>Vistas: {views}</p>;
};

