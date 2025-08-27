import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/apiService";
import { Card } from "../components/common/Card";
import { Select } from "../components/common/Select";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const TeamReportsPage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  // Initialiser les dates par défaut (1er jour du mois actuel à aujourd'hui)
  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    setStartDate(firstDay.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  // Charger les équipes
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await apiService.getTeams();
        setTeams(teamsData);
        
        // Sélectionner automatiquement l'équipe de l'utilisateur
        if (user?.team?.id && teamsData.some(t => t.value === user.team.id)) {
          setSelectedTeamId(user.team.id);
        } else if (teamsData.length > 0) {
          setSelectedTeamId(teamsData[0].value);
        }
      } catch (err) {
        setError("Erreur lors du chargement des équipes: " + err.message);
      } finally {
        setLoadingTeams(false);
      }
    };

    loadTeams();
  }, [user]);

  // Valider la plage de dates
  const validateDateRange = () => {
    if (!startDate || !endDate) {
      setError("Veuillez sélectionner une date de début et une date de fin");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setError("La date de début doit être antérieure à la date de fin");
      return false;
    }

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      setError("La plage de dates ne peut pas dépasser 31 jours");
      return false;
    }

    return true;
  };

  // Charger le rapport
  const loadReport = async () => {
    if (!selectedTeamId || !validateDateRange()) return;

    setLoading(true);
    setError("");
    
    try {
      const data = await apiService.getTeamPlanningReport(selectedTeamId, startDate, endDate);
      setReportData(data);
    } catch (err) {
      setError("Erreur lors du chargement du rapport: " + err.message);
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  // Exporter vers Excel
  const exportToExcel = async () => {
    if (!selectedTeamId || !validateDateRange()) return;

    setExporting(true);
    setError("");

    try {
      await apiService.exportTeamPlanningToExcel(selectedTeamId, startDate, endDate);
    } catch (err) {
      setError("Erreur lors de l'export Excel: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  // Obtenir la classe CSS pour le statut
  const getStatusClass = (statusCode) => {
    const classes = {
      'ONSITE': 'bg-green-100 text-green-800 border-green-200',
      'REMOTE': 'bg-blue-100 text-blue-800 border-blue-200',
      'VACATION': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'HOLIDAY': 'bg-red-100 text-red-800 border-red-200',
      'WEEKEND': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return classes[statusCode] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loadingTeams) {
    return (
      <Card title="📊 Rapports d'équipe">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement des équipes...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <Card title="📊 Rapports d'équipe - Filtres">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <Select
    label="👥 Équipe"
    value={selectedTeamId}
    onChange={(e) => setSelectedTeamId(e.target.value)}
    options={teams}
  />
  
  <Input
    label="📅 Date de début"
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />
  
  <Input
    label="📅 Date de fin"
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
  
  {/* CORRECTION: Ajout d'un div avec label vide pour aligner */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">
      Action
    </label>
    <Button 
      onClick={loadReport} 
      disabled={loading || !selectedTeamId}
      className="w-full"
    >
      {loading ? "🔄 Chargement..." : "📊 Générer"}
    </Button>
  </div>
</div>

        {reportData && (
          <div className="flex justify-end">
            <Button 
              onClick={exportToExcel}
              disabled={exporting}
              variant="secondary"
            >
              {exporting ? "📤 Export..." : "📤 Exporter Excel"}
            </Button>
          </div>
        )}
      </Card>

      {/* Résultats */}
      {reportData && (
        <>
     {/* <Card title={`📈 Résumé - ${reportData.teamName}`}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(reportData.statusSummary).map(([status, count]) => (
                <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{count}</div>
                  <div className="text-sm text-gray-600">{status}</div>
                </div>
              ))}
            </div>
        </Card>   */}

          {/* Tableau détaillé */}
          <Card title="📅 Planning détaillé">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Membre
                    </th>
                    {reportData.dateRange.map(date => (
                      <th key={date} className="border border-gray-300 px-2 py-2 text-center font-semibold min-w-[60px]">
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString('fr-FR', { 
                            day: '2-digit',
                            month: '2-digit'
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {reportData.members.map(member => (
                    <tr key={member.userId} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                        {member.fullName}
                    </td>
                    {reportData.dateRange.map(date => {
                        // Essayez différents formats de clés
                        const possibleKeys = [
                        date, // Format original
                        new Date(date).toISOString().split('T')[0], // YYYY-MM-DD
                        new Date(date).toISOString(), // ISO complet
                        new Date(date).toLocaleDateString('fr-FR'), // DD/MM/YYYY
                        new Date(date).getTime().toString() // timestamp
                        ];
                        
                        let dayStatus = null;
                        let usedKey = null;
                        
                        // Trouvez la bonne clé
                        for (const key of possibleKeys) {
                        if (member.dailyStatus && member.dailyStatus[key]) {
                            dayStatus = member.dailyStatus[key];
                            usedKey = key;
                            break;
                        }
                        }
                        
                        return (
                        <td key={date} className="border border-gray-300 px-1 py-1 text-center">
                            {dayStatus ? (
                            <div
                                className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusClass(dayStatus.statusCode)}`}
                                title={`${dayStatus.statusName}${dayStatus.notes ? ' - ' + dayStatus.notes : ''}`}
                                data-key={usedKey} // DEBUG: Pour voir quelle clé fonctionne
                            >
                                {dayStatus.statusEmoji || dayStatus.statusCode.charAt(0)}
                            </div>
                            ) : (
                            // Cellule vide mais visible pour debug
                            <div className="text-gray-300 text-xs" title="Pas de données">
                                -
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

            {/* Légende */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Légende :</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center">
                    🏢
                  </div>
                  <span>Sur site</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 border border-blue-200 rounded flex items-center justify-center">
                    🏠
                  </div>
                  <span>Télétravail</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-100 border border-yellow-200 rounded flex items-center justify-center">
                    🏖️
                  </div>
                  <span>Congés</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-100 border border-red-200 rounded flex items-center justify-center">
                    🎉
                  </div>
                  <span>Férié</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    🌅
                  </div>
                  <span>Week-end</span>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      {loading && (
        <Card>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p>Génération du rapport en cours...</p>
          </div>
        </Card>
      )}
    </div>
  );
};