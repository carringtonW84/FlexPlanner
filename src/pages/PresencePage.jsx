import { useState } from "react";
import { INITIAL_TEAM_MEMBERS } from "../assets/constants/initialTeamsMembers";
import { Card } from "../components/common/Card";
import { TreeView } from "../components/common/Treeview";
import { TEAM_OPTIONS } from "../assets/constants/teamOptions";

export const PresencePage = ({ selectedTeam, setSelectedTeam }) => {
  const filteredMembers = INITIAL_TEAM_MEMBERS.filter(
    (m) => m.team === selectedTeam
  );
  const presentMembers = filteredMembers.filter((m) => m.status === "present");
  const absentMembers = filteredMembers.filter((m) => m.status === "absent");

  return (
    <div className="space-y-8">
      <Card title="🎯 Sélection de l'équipe">
        <div className="max-w-md mx-auto">
          <TreeView
            label="👥 Équipe"
            value={selectedTeam}
            onChange={setSelectedTeam}
            options={TEAM_OPTIONS}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={`✅ Personnes présentes (${presentMembers.length})`}>
          <div className="space-y-4">
            {presentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border-2 border-green-200 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300"
              >
                <div className="font-semibold text-green-800 text-lg">
                  👤 {member.name}
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${
                    member.location === "sur site"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-orange-200 text-orange-800"
                  }`}
                >
                  {member.location === "sur site" ? "🏢" : "🏠"}{" "}
                  {member.location}
                </span>
              </div>
            ))}
            {presentMembers.length === 0 && (
              <div className="text-center text-gray-500 py-12 font-medium text-lg">
                😔 Aucune personne présente
              </div>
            )}
          </div>
        </Card>

        <Card title={`❌ Personnes absentes (${absentMembers.length})`}>
          <div className="space-y-4">
            {absentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border-2 border-red-200 rounded-2xl bg-red-50 hover:bg-red-100 transition-colors duration-300"
              >
                <div className="font-semibold text-red-800 text-lg">
                  👤 {member.name}
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-red-200 text-red-800">
                  🚫 {member.location}
                </span>
              </div>
            ))}
            {absentMembers.length === 0 && (
              <div className="text-center text-gray-500 py-12 font-medium text-lg">
                🎉 Tout le monde est présent !
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
