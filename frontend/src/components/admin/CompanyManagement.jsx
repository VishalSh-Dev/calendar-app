import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CompanyForm from './CompanyForm.jsx';
import CompanyTable from './CompanyTable.jsx';

export default function CompanyManagement() {
  const { companies, addCompany, updateCompany, deleteCompany } = useAppContext();
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddCompany = (company) => {
    addCompany(company);
  };

  const handleUpdateCompany = (company) => {
    updateCompany(company);
    setEditingCompany(null);
  };

  const handleDeleteCompany = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      deleteCompany(companyId);
    }
  };

  return (
    <div className="space-y-6">
      <CompanyForm
        onSubmit={editingCompany ? handleUpdateCompany : handleAddCompany}
        initialData={editingCompany}
      />
      <CompanyTable
        companies={companies}
        onEdit={setEditingCompany}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
}

