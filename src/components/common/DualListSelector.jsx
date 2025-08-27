import React, { useState, useEffect } from "react";

export const DualListSelector = ({
  availableItems = [],
  selectedItems = [],
  onChange,
  availableTitle = "Disponibles",
  selectedTitle = "Sélectionnés",
  className = "",
  disabled = false,
  height = "300px"
}) => {
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  // Créer les listes disponibles et sélectionnées
  const selectedItemIds = selectedItems.map(item => item.value || item.id || item);
  const availableList = availableItems.filter(item => 
    !selectedItemIds.includes(item.value || item.id || item)
  );
  const selectedList = availableItems.filter(item => 
    selectedItemIds.includes(item.value || item.id || item)
  );

  // Gérer les changements de sélection dans les listes
  const handleLeftSelection = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setLeftSelected(options.map(option => option.value));
  };

  const handleRightSelection = (e) => {
    const options = Array.from(e.target.selectedOptions);
    setRightSelected(options.map(option => option.value));
  };

  // Transférer vers la droite (sélectionner)
  const moveToSelected = () => {
    const itemsToMove = availableList.filter(item => 
      leftSelected.includes(item.value || item.id || item)
    );
    
    const newSelectedItems = [...selectedList, ...itemsToMove];
    onChange(newSelectedItems);
    setLeftSelected([]);
  };

  // Transférer vers la gauche (désélectionner)
  const moveToAvailable = () => {
    const newSelectedItems = selectedList.filter(item => 
      !rightSelected.includes(item.value || item.id || item)
    );
    
    onChange(newSelectedItems);
    setRightSelected([]);
  };

  // Tout sélectionner
  const selectAll = () => {
    onChange(availableItems);
    setLeftSelected([]);
  };

  // Tout désélectionner
  const deselectAll = () => {
    onChange([]);
    setRightSelected([]);
  };

  return (
    <div className={`dual-list-selector ${className}`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        
        {/* Liste des éléments disponibles */}
        <div className="col-span-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {availableTitle} ({availableList.length})
          </label>
          <select
            multiple
            value={leftSelected}
            onChange={handleLeftSelection}
            disabled={disabled}
            className="w-full border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
            style={{ height }}
          >
            {availableList.map((item) => (
              <option 
                key={item.value || item.id} 
                value={item.value || item.id}
                className="py-2 px-3 hover:bg-blue-50"
              >
                {item.label || item.name || item}
              </option>
            ))}
          </select>
        </div>

        {/* Boutons de transfert */}
        <div className="col-span-2 flex flex-col items-center space-y-2">
          <button
            type="button"
            onClick={selectAll}
            disabled={disabled || availableList.length === 0}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
            title="Tout sélectionner"
          >
            &gt;&gt;
          </button>
          
          <button
            type="button"
            onClick={moveToSelected}
            disabled={disabled || leftSelected.length === 0}
            className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
            title="Sélectionner"
          >
            &gt;
          </button>
          
          <button
            type="button"
            onClick={moveToAvailable}
            disabled={disabled || rightSelected.length === 0}
            className="w-full px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
            title="Désélectionner"
          >
            &lt;
          </button>
          
          <button
            type="button"
            onClick={deselectAll}
            disabled={disabled || selectedList.length === 0}
            className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
            title="Tout désélectionner"
          >
            &lt;&lt;
          </button>
        </div>

        {/* Liste des éléments sélectionnés */}
        <div className="col-span-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {selectedTitle} ({selectedList.length})
          </label>
          <select
            multiple
            value={rightSelected}
            onChange={handleRightSelection}
            disabled={disabled}
            className="w-full border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
            style={{ height }}
          >
            {selectedList.map((item) => (
              <option 
                key={item.value || item.id} 
                value={item.value || item.id}
                className="py-2 px-3 hover:bg-green-50"
              >
                {item.label || item.name || item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Instructions d'utilisation */}
      <div className="mt-3 text-xs text-gray-500">
        💡 Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs éléments dans une liste, puis utilisez les boutons pour les transférer.
      </div>
    </div>
  );
};