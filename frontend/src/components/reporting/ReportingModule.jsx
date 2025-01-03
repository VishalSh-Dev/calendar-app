import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import CommunicationFrequencyReport from './CommunicationFrequencyReport';
import EngagementEffectivenessDashboard from './EngagementEffectivenessDashboard';
import OverdueCommunicationTrends from './OverdueCommunicationTrends';
import RealTimeActivityLog from './RealTimeActivityLog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ReportingModule() {
  const { companies, communications, communicationMethods } = useAppContext();
  const [activeTab, setActiveTab] = useState('frequency');
  const [frequencyData, setFrequencyData] = useState({});
  const [effectivenessData, setEffectivenessData] = useState({});
  const [overdueData, setOverdueData] = useState({});
  const [filterCompany, setFilterCompany] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    updateChartData();
  }, [companies, communications, communicationMethods, filterCompany, filterDateRange]);

  const updateChartData = () => {
    const filteredCommunications = communications.filter((comm) => {
      const matchesCompany = filterCompany ? comm.companyId === filterCompany : true;
      const matchesDateRange =
        filterDateRange.start && filterDateRange.end
          ? new Date(comm.date) >= new Date(filterDateRange.start) &&
            new Date(comm.date) <= new Date(filterDateRange.end)
          : true;
      return matchesCompany && matchesDateRange;
    });

    // Calculate communication frequency
    const frequency = communicationMethods.reduce((acc, method) => {
      acc[method.name] = filteredCommunications.filter((comm) => comm.type === method.name).length;
      return acc;
    }, {});
    setFrequencyData(frequency);

    // Calculate engagement effectiveness (simplified version)
    const effectiveness = communicationMethods.reduce((acc, method) => {
      const methodComms = filteredCommunications.filter((comm) => comm.type === method.name);
      acc[method.name] = (methodComms.length / filteredCommunications.length) * 100 || 0;
      return acc;
    }, {});
    setEffectivenessData(effectiveness);

    // Calculate overdue communications
    const overdue = companies.reduce((acc, company) => {
      const lastComm = filteredCommunications
        .filter((comm) => comm.companyId === company._id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      
      if (lastComm) {
        const nextDueDate = new Date(lastComm.date);
        nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);
        if (nextDueDate < new Date()) {
          acc[company.name] = (new Date() - nextDueDate) / (1000 * 60 * 60 * 24); // days overdue
        }
      }
      return acc;
    }, {});
    setOverdueData(overdue);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Communication Tracker Report', 14, 22);
    doc.setFontSize(12);
    
    // Add filter information
    doc.text(`Filters: ${filterCompany ? companies.find(c => c._id === filterCompany)?.name : 'All Companies'}`, 14, 32);
    doc.text(`Date Range: ${filterDateRange.start || 'N/A'} to ${filterDateRange.end || 'N/A'}`, 14, 40);
    
    let yOffset = 50;

    // Communication Frequency
    doc.setFontSize(14);
    doc.text('Communication Frequency', 14, yOffset);
    doc.autoTable({
      startY: yOffset + 10,
      head: [['Method', 'Frequency']],
      body: Object.entries(frequencyData).map(([method, frequency]) => [method, frequency]),
    });
    yOffset = doc.lastAutoTable.finalY + 20;

    // Engagement Effectiveness
    doc.setFontSize(14);
    doc.text('Engagement Effectiveness', 14, yOffset);
    doc.autoTable({
      startY: yOffset + 10,
      head: [['Method', 'Effectiveness (%)']],
      body: Object.entries(effectivenessData).map(([method, effectiveness]) => [method, effectiveness.toFixed(2)]),
    });
    yOffset = doc.lastAutoTable.finalY + 20;

    // Overdue Communications
    doc.setFontSize(14);
    doc.text('Overdue Communications', 14, yOffset);
    doc.autoTable({
      startY: yOffset + 10,
      head: [['Company', 'Days Overdue']],
      body: Object.entries(overdueData).map(([company, daysOverdue]) => [company, daysOverdue.toFixed(1)]),
    });

    // Save the PDF
    doc.save('communication_tracker_report.pdf');
  };

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add filter information
    csvContent += `Filters,${filterCompany ? companies.find(c => c._id === filterCompany)?.name : 'All Companies'}\n`;
    csvContent += `Date Range,${filterDateRange.start || 'N/A'} to ${filterDateRange.end || 'N/A'}\n\n`;

    // Communication Frequency
    csvContent += "Communication Frequency\n";
    csvContent += "Method,Frequency\n";
    Object.entries(frequencyData).forEach(([method, frequency]) => {
      csvContent += `${method},${frequency}\n`;
    });
    csvContent += "\n";

    // Engagement Effectiveness
    csvContent += "Engagement Effectiveness\n";
    csvContent += "Method,Effectiveness (%)\n";
    Object.entries(effectivenessData).forEach(([method, effectiveness]) => {
      csvContent += `${method},${effectiveness.toFixed(2)}\n`;
    });
    csvContent += "\n";

    // Overdue Communications
    csvContent += "Overdue Communications\n";
    csvContent += "Company,Days Overdue\n";
    Object.entries(overdueData).forEach(([company, daysOverdue]) => {
      csvContent += `${company},${daysOverdue.toFixed(1)}\n`;
    });

    // Create a download link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "communication_tracker_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadReport = (format) => {
    if (format === 'pdf') {
      generatePDF();
    } else if (format === 'csv') {
      generateCSV();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-gray-800"
        >
          Reporting and Analytics
        </motion.h2>
        <div>
          <button
            onClick={() => handleDownloadReport('pdf')}
            className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownloadReport('csv')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Download CSV
          </button>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Filter by Company
          </label>
          <select
            id="company"
            name="company"
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filterDateRange.start}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filterDateRange.end}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </motion.div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <nav className="flex">
          {['frequency', 'effectiveness', 'overdue', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-indigo-500'
                  : 'text-gray-500 hover:text-gray-700'
              } flex-1 py-4 px-6 text-center font-medium transition-colors duration-200`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'frequency' && <CommunicationFrequencyReport data={frequencyData} />}
          {activeTab === 'effectiveness' && <EngagementEffectivenessDashboard data={effectivenessData} />}
          {activeTab === 'overdue' && <OverdueCommunicationTrends data={overdueData} />}
          {activeTab === 'activity' && <RealTimeActivityLog communications={communications} companies={companies} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

