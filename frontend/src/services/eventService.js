export const fetchUserEvents = async (token) => {
    const response = await fetch("http://localhost:3000/api/events", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, // Acá adjuntamos el token para que el backend nos deje pasar
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("No se pudieron obtener los eventos");
    }

    return await response.json();
};
export const deleteUserEvent = async (id, token) => {
    const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al eliminar el evento");
    }

    return data;
};
export const updateEventStatus = async (id, status, reflection, token) => {
    const response = await fetch(
        `http://localhost:3000/api/events/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status, reflection }),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al actualizar el evento");
    }

    return data;
};
