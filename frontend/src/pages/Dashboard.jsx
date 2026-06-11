import { Link ,  Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserEvents, deleteUserEvent, updateEventStatus } from '../services/eventService';
import HabitWidget from '../components/HabitWidget';
import EventForm from '../components/EventForm';

function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await fetchUserEvents(token);
        setEvents(data);
      } catch (error) {
        console.error('Error cargando eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNewEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteUserEvent(id, token);
      setEvents((prevEvents) => prevEvents.filter((evento) => evento.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleComplete = async (id) => {
    const reflection = window.prompt("Escribí una reflexión para cerrar este evento (opcional):");
    
    if (reflection === null) return;

    const token = localStorage.getItem('token');
    try {
      const data = await updateEventStatus(id, 'completado', reflection, token);
      
      setEvents((prevEvents) =>
        prevEvents.map((evento) => (evento.id === id ? data.evento : evento))
      );
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };
  const handlePostpone = async (id) => {
    const token = localStorage.getItem('token');
    try {
      // Mandamos el estado "pospuesto". La reflexión va como null porque no hace falta acá.
      const data = await updateEventStatus(id, 'pospuesto', null, token);
      
      setEvents((prevEvents) =>
        prevEvents.map((evento) => (evento.id === id ? data.evento : evento))
      );
    } catch (error) {
      console.error('Error al posponer:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Mi Agenda - CaleTracker</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
<EventForm onEventCreated={handleNewEvent} />

<div className="mt-6 flex flex-col gap-4">

  <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <span className="font-bold text-gray-700">Gestión de Hábitos</span>

    <Link
      to="/dashboard/habits"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition text-sm"
    >
      + Administrar
    </Link>
  </div>

  <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <span className="font-bold text-gray-700">Mis Mundos</span>

    <Link
      to="/dashboard/categories"
      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition text-sm"
    >
      Configurar
    </Link>
  </div>

  <HabitWidget />
</div>
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tus Próximas Tareas</h2>
            
            {loading ? (
              <p className="text-gray-500 italic">Cargando tu agenda...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-500">No tenés eventos programados. ¡Tu agenda está libre!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {events.map((evento) => (
                  <div key={evento.id} className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center bg-gray-50">
                    <div>
                      <h3 className="font-bold text-lg text-blue-700">{evento.title}</h3>
                      <p className="text-gray-600">{evento.description}</p>
                      <span className="text-xs font-semibold text-gray-500 mt-2 block">
                        Estado: <span className="uppercase text-gray-700">{evento.status}</span>
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleComplete(evento.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold hover:bg-green-600 transition"
                      >
                        Completar
                      </button>
                        <button
                          onClick={() => handlePostpone(evento.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-bold hover:bg-yellow-600 transition"
                        >
                          Posponer
                        </button>
                      <button
                        onClick={() => handleDelete(evento.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;