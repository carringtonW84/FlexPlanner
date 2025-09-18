// src/pages/OnCallSchedulePage.jsx
import { useState, useEffect, useMemo } from "react";
import { apiService } from "../services/apiService";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

export const OnCallSchedulePage = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [teamMembers, setTeamMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCell, setEditingCell] = useState(null);

  // Configuration des colonnes d'astreintes
  const onCallRoles = [
    { id: 'MANAGER', label: 'Interlocuteur MANAGER', color: 'bg-red-50' },
    { id: 'RA', label: 'Interlocuteur RA', color: 'bg-blue-50' },
    { id: 'WEB', label: 'Interlocuteur WEB', color: 'bg-green-50' },
    { id: 'SERVICE', label: 'Interlocuteur SERVICE', color: 'bg-yellow-50' },
    { id: 'OPS_GCP', label: 'Interlocuteur OPS GCP', color: 'bg-purple-50' },
    { id: 'BO_OPS', label: 'Interlocuteur BO Ops', color: 'bg-pink-50' },
    { id: 'BO_DEV', label: 'Interlocuteur BO Dev', color: 'bg-indigo-50' }
  ];

  // Fonction pour obtenir le numéro de semaine
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // Vérifier si c'est la semaine courante
  const isCurrentWeek = (weekStart) => {
    const today = new Date();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return today >= weekStart && today <= weekEnd;
  };

  // Génération des semaines pour les 3 prochains mois
  const generateWeeks = useMemo(() => {
    const weeks = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lundi de cette semaine
    
    for (let i = -4; i < 12; i++) { // 4 semaines avant + 12 semaines après = 4 mois
      const weekStart = new Date(startOfWeek);
      weekStart.setDate(startOfWeek.getDate() + (i * 7));
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      // Calculer le numéro de semaine
      const weekNumber = getWeekNumber(weekStart);
      
      weeks.push({
        id: `week-${weekStart.getFullYear()}-${weekNumber}`,
        weekNumber: weekNumber,
        startDate: weekStart,
        endDate: weekEnd,
        year: weekStart.getFullYear(),
        isCurrentWeek: isCurrentWeek(weekStart)
      });
    }
    return weeks;
  }, []);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger les membres par rôle d'astreinte
        const membersData = await apiService.getOnCallMembers();
        setTeamMembers(membersData);
        
        // Charger le planning d'astreinte existant
        const scheduleData = await apiService.getOnCallSchedule();
        setScheduleData(scheduleData);
      } catch (err) {
        setError("Erreur lors du chargement des données: " + err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Obtenir la personne assignée pour une semaine et un rôle
  const getAssignedPerson = (weekId, roleId) => {
    const assignment = scheduleData.find(s => s.weekId === weekId && s.roleId === roleId);
    return assignment?.personName || '';
  };

  // Mettre à jour une assignation
  const updateAssignment = async (weekId, roleId, personId, personName) => {
    setSaving(true);
    setError("");

    try {
      await apiService.updateOnCallAssignment({
        weekId,
        roleId,
        personId,
        personName
      });

      // Mettre à jour l'état local
      setScheduleData(prev => {
        const updated = prev.filter(s => !(s.weekId === weekId && s.roleId === roleId));
        if (personId) {
          updated.push({ weekId, roleId, personId, personName });
        }
        return updated;
      });

      setSuccess("✅ Planning mis à jour avec succès !");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError("Erreur lors de la mise à jour: " + err.message);
    } finally {
      setSaving(false);
      setEditingCell(null);
    }
  };

  // Composant de sélection de personne
  const PersonSelector = ({ weekId, roleId, currentValue, members, onUpdate, onCancel }) => (
    <div className="relative z-50">
      <select
        value={currentValue}
        onChange={(e) => {
          const selectedPersonId = e.target.value;
          const selectedPerson = members.find(m => m.id === selectedPersonId);
          onUpdate(selectedPersonId, selectedPerson?.name || '');
        }}
        onBlur={onCancel}
        autoFocus
        className="w-full p-1 border-2 border-red-500 rounded text-xs focus:outline-none"
      >
        <option value="">-- Aucune assignation --</option>
        {members.map(member => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
  );

  if (loading) {
    return (
      <Card title="📅 Planning des astreintes">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement du planning...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card title="📅 Planning des astreintes">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
            {success}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold sticky left-0 bg-gray-100 z-10 min-w-[120px]">
                  <div>Semaine</div>
                  <div className="text-xs text-gray-600 mt-1">Dates</div>
                </th>
                {onCallRoles.map(role => (
                  <th key={role.id} className={`border border-gray-300 p-3 text-center font-semibold min-w-[150px] ${role.color}`}>
                    <div className="text-sm">{role.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateWeeks.map(week => (
                <tr 
                  key={week.id} 
                  className={week.isCurrentWeek ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}
                >
                  <td className={`border border-gray-300 p-3 font-medium sticky left-0 z-10 ${
                    week.isCurrentWeek ? 'bg-yellow-100' : 'bg-white'
                  }`}>
                    <div className="flex flex-col">
                      <span className="font-bold">
                        S{week.weekNumber}
                        {week.isCurrentWeek && <span className="ml-2 text-yellow-600">📍 Actuelle</span>}
                      </span>
                      <span className="text-xs text-gray-600">
                        {week.startDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} - 
                        {week.endDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  
                  {onCallRoles.map(role => {
                    const cellId = `${week.id}-${role.id}`;
                    const isEditing = editingCell === cellId;
                    const assignedPerson = getAssignedPerson(week.id, role.id);
                    const roleMembers = teamMembers[role.id] || [];
                    const currentPersonId = roleMembers.find(m => m.name === assignedPerson)?.id || '';

                    return (
                      <td 
                        key={role.id} 
                        className={`border border-gray-300 p-2 text-center relative ${
                          week.isCurrentWeek ? 'bg-yellow-50' : role.color
                        } hover:bg-opacity-75 transition-colors`}
                      >
                        {isEditing ? (
                          <PersonSelector
                            weekId={week.id}
                            roleId={role.id}
                            currentValue={currentPersonId}
                            members={roleMembers}
                            onUpdate={(personId, personName) => 
                              updateAssignment(week.id, role.id, personId, personName)
                            }
                            onCancel={() => setEditingCell(null)}
                          />
                        ) : (
                          <div
                            onClick={() => setEditingCell(cellId)}
                            className="cursor-pointer p-1 rounded hover:bg-white hover:bg-opacity-50 transition-all min-h-[2rem] flex items-center justify-center"
                            title="Cliquer pour modifier"
                          >
                            {assignedPerson ? (
                              <span className="text-sm font-medium text-gray-800">
                                {assignedPerson}
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400 italic">
                                Non assigné
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Mode d'emploi :</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Cliquez sur une cellule pour assigner une personne à l'astreinte</li>
            <li>• La semaine courante est surlignée en jaune 📍</li>
            <li>• Les modifications sont sauvegardées automatiquement</li>
            <li>• Sélectionnez "Aucune assignation" pour retirer une personne</li>
          </ul>
        </div>
      </Card>

      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-center">Sauvegarde en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
};