import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

export default function CalendarView() {
  const { companies, communications } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const data = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dayData = {
        date: new Date(d),
        communications: communications.filter((comm) => {
          const commDate = new Date(comm.date);
          return (
            commDate.getDate() === d.getDate() &&
            commDate.getMonth() === d.getMonth() &&
            commDate.getFullYear() === d.getFullYear()
          );
        }),
      };
      data.push(dayData);
    }
    setCalendarData(data);
  }, [currentDate, companies, communications]);

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
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
          Calendar View
        </motion.h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Previous
          </button>
          <h3 className="text-xl font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold py-2 bg-indigo-300">
              {day}
            </div>
          ))}
          {calendarData.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`p-2 min-h-[100px] ${
                day.date.getMonth() === currentDate.getMonth()
                  ? "bg-gray-100"
                  : "bg-gray-500"
              }`}
            >
              <div className="font-semibold">{day.date.getDate()}</div>
              {day.communications.map((comm, commIndex) => (
                <motion.div
                  key={commIndex}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: commIndex * 0.1 }}
                  className="text-xs p-1 mb-1 rounded bg-indigo-100 truncate"
                  title={`${
                    companies.find((c) => c._id === comm.companyId)?.name
                  }: ${comm.type}`}
                >
                  {companies.find((c) => c._id === comm.companyId)?.name}:{" "}
                  {comm.type}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
