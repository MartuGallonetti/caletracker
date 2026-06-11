import React, { useState, useEffect } from 'react';

const Categories = () => {
    // Estados para el formulario
    const [name, setName] = useState('');
    const [color, setColor] = useState('bg-purple-200 text-purple-800'); // Color por defecto
    const [keywords, setKeywords] = useState('');
    
    // Estado para listar los mundos existentes
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Opciones de colores estéticos fijos (Tailwind)
    const colorOptions = [
        { name: 'Lila', class: 'bg-purple-200 text-purple-800' },
        { name: 'Celeste', class: 'bg-blue-200 text-blue-800' },
        { name: 'Rosa', class: 'bg-pink-200 text-pink-800' },
        { name: 'Verde', class: 'bg-green-200 text-green-800' },
        { name: 'Amarillo', class: 'bg-yellow-200 text-yellow-800' }
    ];

    // Función para obtener el token (ajustá según dónde lo guardes: localStorage o sessionStorage)
    const getToken = () => localStorage.getItem('token');

    // 1. CARGAR MUNDOS DESDE EL BACKEND
    const fetchCategories = async () => {
        try {
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Enviamos el token al middleware verifyToken
                }
            });

            if (!response.ok) throw new Error('Error al obtener categorías');
            
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(error);
            alert('No se pudieron cargar tus mundos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // 2. GUARDAR UN NUEVO MUNDO EN EL BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !keywords) return alert('Completá los campos obligatorios');
        
        try {
            const token = getToken();
            const response = await fetch('http://localhost:3000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    color,
                    keywords
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar');
            }

            const newCategory = await response.json();
            
            // Actualizamos el estado local con lo que nos devuelve la base de datos
            setCategories([...categories, newCategory]);
            
            // Limpiar formulario
            setName('');
            setKeywords('');
        } catch (error) {
            console.error(error);
            alert(error.message || 'Hubo un problema al crear el mundo');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Configuración de "Mis Mundos"</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FORMULARIO DE CREACIÓN */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Crear un Nuevo Mundo</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Mundo</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: Deportes, Trabajo..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Color de Identidad</label>
                        <div className="flex gap-3">
                            {colorOptions.map((opt) => (
                                <button
                                    key={opt.class}
                                    type="button"
                                    className={`w-8 h-8 rounded-full border-2 ${opt.class.split(' ')[0]} ${color === opt.class ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                    onClick={() => setColor(opt.class)}
                                    title={opt.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Palabras Clave (Separadas por coma)</label>
                        <textarea 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: gym, pole, bici, entrenar"
                            rows="3"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                        <span className="text-xs text-gray-400 mt-1 block">Estas palabras activarán este mundo de forma automática al escribir una tarea.</span>
                    </div>

                    <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition-colors">
                        Guardar Mundo
                    </button>
                </form>

                {/* LISTA DE MUNDOS ACTIVOS */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Tus Mundos Activos</h3>
                    
                    {loading ? (
                        <p className="text-sm text-gray-500">Cargando tus mundos...</p>
                    ) : categories.length === 0 ? (
                        <p className="text-sm text-gray-400">Aún no creaste ningún mundo. ¡Armá el primero!</p>
                    ) : (
                        <div className="space-y-3">
                            {categories.map((cat) => (
                                <div key={cat.id} className="p-3 border border-gray-200 rounded-lg flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${cat.color}`}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <span className="font-medium text-gray-700">Keywords:</span> {cat.keywords}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;