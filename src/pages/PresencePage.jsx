// src/pages/PresencePage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/apiService";
import { Card } from "../components/common/Card";
import { Select } from "../components/common/Select";

export const PresencePage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [error, setError] = useState("");

  // Charger les équipes disponibles
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsData = await apiService.getTeams();
        setTeams(teamsData);

        // Sélectionner l'équipe de l'utilisateur par défaut
        if (user?.team?.id && teamsData.some((t) => t.value === user.team.id)) {
          setSelectedTeamId(user.team.id);
        } else if (teamsData.length > 0) {
          setSelectedTeamId(teamsData[0].value);
        }
      } catch (err) {
        setError("Erreur lors du chargement des équipes: " + err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, [user]);

  // Charger les membres de l'équipe sélectionnée
  useEffect(() => {
    const loadTeamMembers = async () => {
      if (!selectedTeamId) {
        setTeamMembers([]);
        return;
      }

      setLoadingMembers(true);
      setError("");

      try {
        const members = await apiService.getTeamMembers(selectedTeamId);
        setTeamMembers(members);
      } catch (err) {
        setError("Erreur lors du chargement des membres: " + err.message);
        console.error("Erreur:", err);
      } finally {
        setLoadingMembers(false);
      }
    };

    loadTeamMembers();
  }, [selectedTeamId]);

  // Filtrer les membres par statut
  const presentMembers = teamMembers.filter((m) => m.status === "present");
  const absentMembers = teamMembers.filter((m) => m.status === "absent");

  const getLocationDisplay = (location) => {
    switch (location.toLowerCase()) {
      case "sur site":
        return {
          icon: "🏢",
          text: "sur site",
          color: "bg-blue-200 text-blue-800",
        };
      case "télétravail":
        return {
          icon: "🏠",
          text: "télétravail",
          color: "bg-orange-200 text-orange-800",
        };
      case "congés":
        return { icon: "🏖️", text: "congés", color: "bg-red-200 text-red-800" };
      case "formation":
        return {
          icon: "📚",
          text: "formation",
          color: "bg-purple-200 text-purple-800",
        };
      case "week-end":
        return {
          icon: "🌅",
          text: "week-end",
          color: "bg-gray-200 text-gray-800",
        };
      default:
        return {
          icon: "❓",
          text: location,
          color: "bg-gray-200 text-gray-800",
        };
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Chargement des équipes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card title="🎯 Sélection de l'équipe">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="max-w-md mx-auto">
          <Select
            label="👥 Équipe"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            options={teams}
          />
        </div>
      </Card>

      {selectedTeamId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title={`✅ Personnes présentes (${presentMembers.length})`}>
            {loadingMembers ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-sm">Chargement...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {presentMembers.map((member) => {
                  const locationInfo = getLocationDisplay(member.location);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border-2 border-green-200 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300"
                    >
                      <div className="font-semibold text-green-800 text-lg">
                        👤 {member.name}
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${locationInfo.color}`}
                      >
                        {locationInfo.icon} {locationInfo.text}
                      </span>
                    </div>
                  );
                })}
                {presentMembers.length === 0 && (
                  <div className="text-center text-gray-500 py-12 font-medium text-lg">
                    😔 Aucune personne présente
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card title={`❌ Personnes absentes (${absentMembers.length})`}>
            {loadingMembers ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-sm">Chargement...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {absentMembers.map((member) => {
                  const locationInfo = getLocationDisplay(member.location);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border-2 border-red-200 rounded-2xl bg-red-50 hover:bg-red-100 transition-colors duration-300"
                    >
                      <div className="font-semibold text-red-800 text-lg">
                        👤 {member.name}
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${locationInfo.color}`}
                      >
                        {locationInfo.icon} {locationInfo.text}
                      </span>
                    </div>
                  );
                })}
                {absentMembers.length === 0 && (
                  <div className="text-center text-gray-500 py-12 font-medium text-lg">
                    🎉 Tout le monde est présent !
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
