// src/pages/AccountPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/apiService";
import { useForm } from "../hooks/useForm";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Select } from "../components/common/Select";

export const AccountPage = () => {
  const { user, updateUser, logout } = useAuth();
  const [teams, setTeams] = useState([]);
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
    teamId: "",
    velocity: 0,
  });

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        const teamsData = await apiService.getTeams();
        setTeams([{ value: "", label: "Aucune équipe" }, ...teamsData]);

        if (user) {
          setValues({
            email: user.email,
            password: "",
            teamId: user.team?.id || "",
            velocity: user.velocity,
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

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {};

      if (userAccount.password) {
        updateData.password = userAccount.password;
      }

      if (userAccount.teamId !== (user.team?.id || "")) {
        updateData.teamId = userAccount.teamId || null;
      }

      if (userAccount.velocity !== user.velocity) {
        updateData.velocity = parseInt(userAccount.velocity);
      }

      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
        setSuccess("✅ Compte mis à jour avec succès !");

        // Réinitialiser le mot de passe
        handleAccountChange("password")({ target: { value: "" } });

        // Faire disparaître le message après 3 secondes
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setSuccess("Aucune modification à sauvegarder");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Erreur lors de la sauvegarde: " + err.message);
      console.error("Erreur:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };

  if (loading) {
    return (
      <Card title="⚙️ Informations du compte">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
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

      <div className="max-w-md mx-auto space-y-6">
        <Input label="📧 E-mail" value={userAccount.email} readOnly={true} />

        <Input
          label="🔒 Nouveau mot de passe"
          type="password"
          value={userAccount.password}
          onChange={handleAccountChange("password")}
          placeholder="Laissez vide pour ne pas changer"
        />

        <Select
          label="👥 Équipe"
          value={userAccount.teamId}
          onChange={handleAccountChange("teamId")}
          options={teams}
        />

        <Input
          label="⚡ Vélocité (points/sprint)"
          type="number"
          value={userAccount.velocity}
          onChange={handleAccountChange("velocity")}
          placeholder="Points par sprint"
          min="0"
        />

        <div className="flex space-x-4 justify-center mt-8">
          <Button onClick={handleSave} size="large" disabled={saving}>
            {saving ? "🔄 Sauvegarde..." : "💾 Sauvegarder"}
          </Button>

          <Button
            variant="outline"
            size="large"
            onClick={() => window.location.reload()}
          >
            ❌ Annuler
          </Button>

          <Button variant="danger" size="large" onClick={handleLogout}>
            🚪 Déconnexion
          </Button>
        </div>
      </div>
    </Card>
  );
};
