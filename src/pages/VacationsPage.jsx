import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Select } from "../components/common/Select";
import { Button } from "../components/common/Button";
import { VACATION_TYPE_OPTIONS } from "../assets/constants/vacationTypeOptions";

export const VacationsPage = ({ vacations, setVacations }) => {
  const {
    values: newVacation,
    handleChange: handleVacationChange,
    reset: resetVacation,
  } = useForm({
    startDate: "",
    endDate: "",
    type: "Congés payés",
  });

  const addVacation = () => {
    if (newVacation.startDate && newVacation.endDate) {
      setVacations([...vacations, { id: Date.now(), ...newVacation }]);
      resetVacation();
    }
  };

  return (
    <div className="space-y-8">
      <Card title="➕ Ajouter des congés">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            value={newVacation.type}
            onChange={handleVacationChange("type")}
            options={VACATION_TYPE_OPTIONS}
          />
        </div>
        <div className="text-center mt-6">
          <Button onClick={addVacation} size="large">
            ➕ Ajouter les congés
          </Button>
        </div>
      </Card>

      <Card title="📋 Mes congés programmés">
        <div className="space-y-4">
          {vacations.map((vacation) => (
            <div
              key={vacation.id}
              className="flex items-center justify-between p-6 border-2 border-yellow-200 rounded-2xl bg-yellow-50 hover:bg-yellow-100 transition-colors duration-300"
            >
              <div>
                <div className="font-bold text-lg text-yellow-800">
                  {vacation.type}
                </div>
                <div className="text-yellow-600 font-medium">
                  📅 Du{" "}
                  {new Date(vacation.startDate).toLocaleDateString("fr-FR")}
                  au {new Date(vacation.endDate).toLocaleDateString("fr-FR")}
                </div>
              </div>
              <Button
                variant="danger"
                size="small"
                onClick={() =>
                  setVacations(vacations.filter((v) => v.id !== vacation.id))
                }
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
