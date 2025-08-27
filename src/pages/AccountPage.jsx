// src/pages/AccountPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/apiService";
import { useForm } from "../hooks/useForm";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { DualListSelector } from "../components/common/DualListSelector";

export const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    values: userAccount,
    handleChange: handleAccountChange,
    setValues,
  } = useForm({
    email: "",
    password: "",
    velocity: 0,
    selectedTeams: [], // Liste des équipes sélectionnées
  });

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        // Récupérer toutes les équipes disponibles
        const teamsData = await apiService.getTeams();
        setAllTeams(teamsData);

        if (user) {
          // Récupérer les équipes actuelles de l'utilisateur
          const userTeams = user.teams || [];
          
          setValues({
            email: user.email,
            password: "",
            velocity: user.velocity,
            selectedTeams: userTeams.map(team => ({
              value: team.id,
              label: team.name
            }))
          });
        }
      } catch (err) {
        setError("Erreur lors du chargement des données: " + err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, setValues]);

  // Gérer les changements de sélection d'équipes
  const handleTeamsChange = (selectedTeams) => {
    handleAccountChange("selectedTeams")(selectedTeams);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {};

      if (userAccount.password) {
        updateData.password = userAccount.password;
      }

      // Convertir les équipes sélectionnées en IDs
      if (userAccount.selectedTeams) {
        updateData.teamIds = userAccount.selectedTeams.map(team => team.value);
      } else {
        updateData.teamIds = [];
      }

      if (userAccount.velocity !== user.velocity) {
        updateData.velocity = parseInt(userAccount.velocity);
      }

      await updateUser(updateData);
      setSuccess("✅ Compte mis à jour avec succès !");

      // Réinitialiser le mot de passe
      handleAccountChange("password")({ target: { value: "" } });

      // Faire disparaître le message après 3 secondes
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de la sauvegarde: " + err.message);
      console.error("Erreur:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler les modifications ?")) {
      // Recharger les données depuis l'utilisateur actuel
      const userTeams = user.teams || [];
      
      setValues({
        email: user.email,
        password: "",
        velocity: user.velocity,
        selectedTeams: userTeams.map(team => ({
          value: team.id,
          label: team.name
        }))
      });
      setError("");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <Card title="⚙️ Informations du compte">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Chargement des informations...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="⚙️ Informations du compte">
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

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="📧 E-mail" value={userAccount.email} readOnly={true} />

          <Input
            label="🔒 Nouveau mot de passe"
            type="password"
            value={userAccount.password}
            onChange={handleAccountChange("password")}
            placeholder="Laissez vide pour ne pas changer"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            👥 Gestion des équipes
          </label>
          <DualListSelector
            availableItems={allTeams}
            selectedItems={userAccount.selectedTeams}
            onChange={handleTeamsChange}
            availableTitle="Équipes disponibles"
            selectedTitle="Mes équipes"
            height="250px"
            disabled={saving}
          />
        </div>

        <div className="max-w-md">
          <Input
            label="⚡ Vélocité (points/sprint)"
            type="number"
            value={userAccount.velocity}
            onChange={handleAccountChange("velocity")}
            placeholder="Points par sprint"
            min="0"
          />
        </div>

        <div className="flex space-x-4 justify-center mt-8">
          <Button onClick={handleSave} size="large" disabled={saving}>
            {saving ? "🔄 Sauvegarde..." : "💾 Sauvegarder"}
          </Button>

          <Button variant="outline" size="large" onClick={handleCancel}>
            ❌ Annuler
          </Button>
        </div>
      </div>
    </Card>
  );
};