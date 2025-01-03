import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export default function CompanyRow({ company, communications, isSelected, onSelect }) {
  const { getLastFiveCommunications, getNextScheduledCommunication, isOverdue, isDueToday } = useAppContext();

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${
        isOverdue(company)
          ? 'bg-red-50'
          : isDueToday(company)
          ? 'bg-yellow-50'
          : ''
      } transition-colors duration-200 ease-in-out hover:bg-gray-50`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(company._id)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200 ease-in-out"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{company.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ul className="space-y-1">
          {getLastFiveCommunications(company._id).map((comm, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <span className="cursor-pointer text-sm text-gray-500">
                {comm.type} - {new Date(comm.date).toLocaleDateString()}
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute z-10 p-2 bg-white rounded shadow-md text-xs text-gray-700 hidden group-hover:block"
              >
                {comm.notes}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {getNextScheduledCommunication(company._id) ? (
          <>
            {getNextScheduledCommunication(company._id).type} -{' '}
            {new Date(getNextScheduledCommunication(company._id).date).toLocaleDateString()}
          </>
        ) : (
          'No communications scheduled'
        )}
      </td>
    </motion.tr>
  );
}

