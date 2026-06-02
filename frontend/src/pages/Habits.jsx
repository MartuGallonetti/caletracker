import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserHabits, createNewHabit } from '../services/habitService';

function Habits() {
const navigate = useNavigate();
const [habits, setHabits] = useState([]);
const [title, setTitle] = useState('');
const [loading, setLoading] = useState(true);

useEffect(() => {
    const loadHabits = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }
    try {
        const data = await fetchUserHabits(token);
        setHabits(data);
    } catch (error) {
        console.error('Error cargando hábitos:', error);
    } finally {
        setLoading(false);
    }
    };
    loadHabits();
}, [navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const data = await createNewHabit(title, token);
      setHabits((prev) => [...prev, data.habito]);
      setTitle(''); // Limpia el input después de guardar
    } catch (error) {
      console.error('Error al crear:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Administrar Hábitos</h1>
          <Link 
            to="/dashboard"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition"
          >
            Volver al Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de creación */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 h-fit">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Nuevo Hábito</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-bold mb-2">Nombre del hábito</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Ej: Leer 10 minutos"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
              >
                Guardar Hábito
              </button>
            </form>
          </div>

          {/* Lista de hábitos actuales */}
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tus Hábitos Activos</h2>
            {loading ? (
              <p className="text-gray-500 italic">Cargando...</p>
            ) : habits.length === 0 ? (
              <p className="text-gray-500">No tenés hábitos registrados.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {habits.map((habit) => (
                  <li key={habit.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center">
                    <span className="font-bold text-gray-800">{habit.title}</span>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Racha récord: {habit.longest_streak}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Habits;