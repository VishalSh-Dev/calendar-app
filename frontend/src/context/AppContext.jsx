import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [notifications, setNotifications] = useState({ overdue: [], dueToday: [] });

  const API_URL = 'https://calendar-app-backend-silk.vercel.app/api/';

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [companiesData, methodsData, communicationsData] = await Promise.all([
          axios.get(`${API_URL}/companies`),
          axios.get(`${API_URL}/communication-methods`),
          axios.get(`${API_URL}/communications`),
        ]);
        setCompanies(companiesData.data);
        setCommunicationMethods(methodsData.data);
        setCommunications(communicationsData.data);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    updateNotifications();
  }, [companies, communications]);

  const updateNotifications = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdue = [];
    const dueToday = [];

    companies.forEach((company) => {
      const lastCommunication = communications
        .filter((comm) => comm.companyId === company._id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

      if (lastCommunication) {
        const nextDueDate = new Date(lastCommunication.date);
        nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);
        nextDueDate.setHours(0, 0, 0, 0);

        if (nextDueDate < today) {
          overdue.push(company);
        } else if (nextDueDate.getTime() === today.getTime()) {
          dueToday.push(company);
        }
      } else {
        overdue.push(company);
      }
    });

    setNotifications({ overdue, dueToday });
  };

  const getLastFiveCommunications = (companyId) => {
    return communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  const getNextScheduledCommunication = (companyId) => {
    const company = companies.find((c) => c._id === companyId);
    const lastCommunication = communications
      .filter((comm) => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (!lastCommunication) return null;

    const nextDueDate = new Date(lastCommunication.date);
    nextDueDate.setDate(nextDueDate.getDate() + company.communicationPeriodicity);

    return {
      type: lastCommunication.type,
      date: nextDueDate,
    };
  };

  const isOverdue = (company) => {
    const nextScheduled = getNextScheduledCommunication(company._id);
    return nextScheduled && new Date(nextScheduled.date) < new Date();
  };

  const isDueToday = (company) => {
    const nextScheduled = getNextScheduledCommunication(company._id);
    if (!nextScheduled) return false;

    const today = new Date();
    const scheduledDate = new Date(nextScheduled.date);
    return (
      scheduledDate.getDate() === today.getDate() &&
      scheduledDate.getMonth() === today.getMonth() &&
      scheduledDate.getFullYear() === today.getFullYear()
    );
  };

  const addCompany = async (company) => {
    try {
      const response = await axios.post(`${API_URL}/companies`, company);
      setCompanies([...companies, response.data]);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const updateCompany = async (updatedCompany) => {
    try {
      const response = await axios.put(`${API_URL}/companies/${updatedCompany._id}`, updatedCompany);
      setCompanies(companies.map((company) => (company._id === updatedCompany._id ? response.data : company)));
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const deleteCompany = async (companyId) => {
    try {
      await axios.delete(`${API_URL}/companies/${companyId}`);
      setCompanies(companies.filter((company) => company._id !== companyId));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const addCommunicationMethod = async (method) => {
    try {
      const response = await axios.post(`${API_URL}/communication-methods`, method);
      setCommunicationMethods([...communicationMethods, response.data]);
    } catch (error) {
      console.error('Error adding communication method:', error);
    }
  };

  const updateCommunicationMethod = async (updatedMethod) => {
    try {
      const response = await axios.put(`${API_URL}/communication-methods/${updatedMethod._id}`, updatedMethod);
      setCommunicationMethods(
        communicationMethods.map((method) => (method._id === updatedMethod._id ? response.data : method))
      );
    } catch (error) {
      console.error('Error updating communication method:', error);
    }
  };

  const deleteCommunicationMethod = async (methodId) => {
    try {
      await axios.delete(`${API_URL}/communication-methods/${methodId}`);
      setCommunicationMethods(communicationMethods.filter((method) => method._id !== methodId));
    } catch (error) {
      console.error('Error deleting communication method:', error);
    }
  };

  const addCommunication = async (communication) => {
    try {
      const response = await axios.post(`${API_URL}/communications`, communication);
      setCommunications([...communications, response.data]);
    } catch (error) {
      console.error('Error adding communication:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        companies,
        communicationMethods,
        communications,
        notifications,
        getLastFiveCommunications,
        getNextScheduledCommunication,
        isOverdue,
        isDueToday,
        addCompany,
        updateCompany,
        deleteCompany,
        addCommunicationMethod,
        updateCommunicationMethod,
        deleteCommunicationMethod,
        addCommunication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

