import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CommunicationMethodForm from './CommunicationMethodForm.jsx';
import CommunicationMethodTable from './CommunicationMethodTable.jsx';

export default function CommunicationMethodManagement() {
  const { communicationMethods, addCommunicationMethod, updateCommunicationMethod, deleteCommunicationMethod } = useAppContext();
  const [editingMethod, setEditingMethod] = useState(null);

  const handleAddMethod = (method) => {
    addCommunicationMethod(method);
  };

  const handleUpdateMethod = (method) => {
    updateCommunicationMethod(method);
    setEditingMethod(null);
  };

  const handleDeleteMethod = (methodId) => {
    if (window.confirm('Are you sure you want to delete this communication method?')) {
      deleteCommunicationMethod(methodId);
    }
  };

  return (
    <div className="space-y-6">
      <CommunicationMethodForm
        onSubmit={editingMethod ? handleUpdateMethod : handleAddMethod}
        initialData={editingMethod}
      />
      <CommunicationMethodTable
        methods={communicationMethods}
        onEdit={setEditingMethod}
        onDelete={handleDeleteMethod}
      />
    </div>
  );
}

