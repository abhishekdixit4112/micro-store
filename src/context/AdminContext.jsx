import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdminOpen, setIsAdminOpen }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);