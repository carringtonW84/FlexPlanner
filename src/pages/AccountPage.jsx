import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Card } from "../components/common/Card";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { TreeView } from "../components/common/Treeview";
import { TEAM_OPTIONS } from "../assets/constants/teamOptions";

export const AccountPage = () => {
  const { values: userAccount, handleChange: handleAccountChange } = useForm({
    email: "utilisateur@exemple.com",
    password: "",
    equipe: "Équipe Développement",
    velocite: 25,
  });

  return (
    <Card title="⚙️ Informations du compte">
      <div className="max-w-md mx-auto">
        <Input label="📧 E-mail" value={userAccount.email} readOnly={true} />
        <Input
          label="🔒 Mot de passe"
          type="password"
          value={userAccount.password}
          onChange={handleAccountChange("password")}
          placeholder="Nouveau mot de passe"
        />
        <TreeView
          label="👥 Équipe"
          value={userAccount.equipe}
          onChange={handleAccountChange("equipe")}
          options={TEAM_OPTIONS}
        />
        <Input
          label="⚡ Vélocité (points/sprint)"
          type="number"
          value={userAccount.velocite}
          onChange={handleAccountChange("velocite")}
          placeholder="Points par sprint"
        />
        <div className="flex space-x-4 justify-center mt-8">
          <Button onClick={() => alert("✅ Compte sauvegardé !")} size="large">
            💾 Sauvegarder
          </Button>
          <Button variant="outline" size="large">
            ❌ Annuler
          </Button>
        </div>
      </div>
    </Card>
  );
};
