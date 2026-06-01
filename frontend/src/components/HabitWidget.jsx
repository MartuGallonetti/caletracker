import React, { useState, useEffect } from 'react';
import { fetchUserHabits, logHabitStatus } from '../services/habitService';

function HabitWidget() {
  const [habits, setHabits] = useState([]);
  const [localStatuses, setLocalStatuses] = useState({});

  useEffect(() => {
    const loadHabits = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await fetchUserHabits(token);
        setHabits(data);
      } catch (error) {
        console.error('Error cargando hábitos:', error);
      }
    };
    loadHabits();
  }, []);

  const handleStatusChange = async (habitId, status) => {
    const token = localStorage.getItem('token');
    try {
      await logHabitStatus(habitId, status, token);
      
      setLocalStatuses(prev => ({ ...prev, [habitId]: status }));

      setHabits(prevHabits => prevHabits.map(habit => {
        if (habit.id === habitId) {
          if (status === 'completado') return { ...habit, current_streak: habit.current_streak + 1 };
          if (status === 'no_cumplido') return { ...habit, current_streak: 0 };
        }
        return habit;
      }));
    } catch (error) {
      console.error('Error al registrar estado:', error);
    }
  };

  if (habits.length === 0) return null;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mt-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Seguimiento Diario</h2>
      <div className="flex flex-col gap-3">
        {habits.map((habit) => {
          const currentStatus = localStatuses[habit.id] || 'pendiente';
          const isFailed = currentStatus === 'no_cumplido';

          return (
            <div 
              key={habit.id} 
              className={`flex justify-between items-center p-3 rounded-lg border transition-colors ${
                isFailed ? 'bg-pink-100 border-pink-300' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div>
                <span className="font-bold text-gray-800 block text-sm">{habit.title}</span>
                <span className="text-xs font-semibold text-gray-500">🔥 Racha: {habit.current_streak}</span>
              </div>
              
              <select 
                className="text-sm p-1.5 border rounded-md bg-white cursor-pointer font-medium text-gray-700 outline-none"
                value={currentStatus}
                onChange={(e) => handleStatusChange(habit.id, e.target.value)}
              >
                <option value="pendiente" disabled>Estado hoy...</option>
                <option value="completado">✅ Completado</option>
                <option value="pospuesto">➖ Pospuesto</option>
                <option value="no_cumplido">❌ No cumplido</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitWidget;