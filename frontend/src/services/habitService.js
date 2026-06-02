// Traer todos los hábitos del usuario
export const fetchUserHabits = async (token) => {
    const response = await fetch("http://localhost:3000/api/habits", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al cargar hábitos");
    return data;
};

// Enviar el estado diario del hábito (completado, pospuesto, no_cumplido)
export const logHabitStatus = async (id, status, token) => {
    const response = await fetch(`http://localhost:3000/api/habits/${id}/log`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data.error || "Error al registrar estado");
    return data;
};

// Crear un nuevo hábito
export const createNewHabit = async (title, token) => {
    const response = await fetch("http://localhost:3000/api/habits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Error al crear el hábito");
    return data;
};

// NUEVA FUNCIÓN: Eliminar un hábito
export const deleteHabitAPI = async (id, token) => {
    const response = await fetch(`http://localhost:3000/api/habits/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data.error || "Error al eliminar el hábito");
    return data;
};
