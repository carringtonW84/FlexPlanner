// src/pages/VacationsPage.jsx
import { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import { useForm } from "../hooks/useForm";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Select } from "../components/common/Select";
import { Button } from "../components/common/Button";

export const VacationsPage = () => {
  const [vacations, setVacations] = useState([]);
  const [vacationTypes, setVacationTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const {
    values: newVacation,
    handleChange: handleVacationChange,
    reset: resetVacation,
  } = useForm({
    startDate: "",
    endDate: "",
    vacationTypeCode: "",
    notes: "",
  });

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [vacationsData, typesData] = await Promise.all([
          apiService.getVacations(),
          apiService.getVacationTypes(),
        ]);

        setVacations(vacationsData);
        setVacationTypes(typesData);

        // Sélectionner le premier type par défaut
        if (typesData.length > 0) {
          handleVacationChange("vacationTypeCode")(typesData[0].value);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données: " + err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addVacation = async () => {
    if (
      !newVacation.startDate ||
      !newVacation.endDate ||
      !newVacation.vacationTypeCode
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const newVac = await apiService.createVacation({
        vacationTypeCode: newVacation.vacationTypeCode,
        startDate: newVacation.startDate,
        endDate: newVacation.endDate,
        notes: newVacation.notes,
      });

      setVacations([...vacations, newVac]);
      resetVacation();

      // Remettre le premier type par défaut
      if (vacationTypes.length > 0) {
        handleVacationChange("vacationTypeCode")(vacationTypes[0].value);
      }
    } catch (err) {
      setError("Erreur lors de la création des congés: " + err.message);
      console.error("Erreur:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteVacation = async (vacationId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ces congés ?")) {
      return;
    }

    try {
      await apiService.deleteVacation(vacationId);
      setVacations(vacations.filter((v) => v.id !== vacationId));
    } catch (err) {
      setError("Erreur lors de la suppression: " + err.message);
      console.error("Erreur:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Chargement des congés...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card title="➕ Ajouter des congés">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Input
            label="📅 Date de début"
            type="date"
            value={newVacation.startDate}
            onChange={handleVacationChange("startDate")}
          />
          <Input
            label="📅 Date de fin"
            type="date"
            value={newVacation.endDate}
            onChange={handleVacationChange("endDate")}
          />
          <Select
            label="🏷️ Type de congé"
            value={newVacation.vacationTypeCode}
            onChange={handleVacationChange("vacationTypeCode")}
            options={vacationTypes}
          />
          <Input
            label="📝 Notes (optionnel)"
            value={newVacation.notes}
            onChange={handleVacationChange("notes")}
            placeholder="Notes supplémentaires"
          />
        </div>
        <div className="text-center mt-6">
          <Button onClick={addVacation} size="large" disabled={saving}>
            {saving ? "🔄 Ajout..." : "➕ Ajouter les congés"}
          </Button>
        </div>
      </Card>

      <Card title="📋 Mes congés programmés">
        <div className="space-y-4">
          {vacations.map((vacation) => (
            <div
              key={vacation.id}
              className="flex items-center justify-between p-6 border-2 border-green-200 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300"
            >
              <div className="flex-1">
                <div className="font-bold text-lg text-green-800 mb-1">
                  {vacation.type}
                </div>
                <div className="text-green-600 font-medium mb-2">
                  📅 Du{" "}
                  {new Date(vacation.startDate).toLocaleDateString("fr-FR")} au{" "}
                  {new Date(vacation.endDate).toLocaleDateString("fr-FR")}
                </div>
                {vacation.notes && (
                  <div className="text-sm text-green-700 mt-2 italic">
                    📝 {vacation.notes}
                  </div>
                )}
              </div>
              <Button
                variant="danger"
                size="small"
                onClick={() => deleteVacation(vacation.id)}
              >
                🗑️ Supprimer
              </Button>
            </div>
          ))}
          {vacations.length === 0 && (
            <div className="text-center text-gray-500 py-12 font-medium text-lg">
              🏖️ Aucun congé programmé
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
