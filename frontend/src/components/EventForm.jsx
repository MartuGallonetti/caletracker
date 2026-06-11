import { useState } from 'react';

export default function EventForm({ onEventCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    priority: 'media',
    category_id: null,
    all_day: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onEventCreated(data.evento);

        setFormData({
          title: '',
          description: '',
          start_time: '',
          end_time: '',
          priority: 'media',
          category_id: null,
          all_day: false,
        });
      } else {
        console.error('Error en el servidor:', data.error);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4"
    >
      <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
        Crear Nuevo Evento
      </h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">
          Título
        </label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">
          Descripción
        </label>
        <textarea
          name="description"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col w-1/2 gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Inicio
          </label>
          <input
            type="datetime-local"
            name="start_time"
            required
            value={formData.start_time}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col w-1/2 gap-1">
          <label className="text-xs font-semibold text-gray-600">
            Fin
          </label>
          <input
            type="datetime-local"
            name="end_time"
            required
            value={formData.end_time}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition mt-2 text-sm"
      >
        Guardar Evento
      </button>
    </form>
  );
}