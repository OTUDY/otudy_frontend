import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface ClassSubSectionContextProps {
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const ClassSubSectionContext = createContext<
  ClassSubSectionContextProps | undefined
>(undefined);

export const useClassSubSectionContext = () => {
  const context = useContext(ClassSubSectionContext);
  if (!context) {
    throw new Error(
      "useClassSubSectionContext must be used within a ClassSubSectionProvider"
    );
  }
  return context;
};

import React, { FC, useState } from "react";

export const ClassSubSectionProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedItem, setSelectedItem] = useState("student");

  return (
    <ClassSubSectionContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </ClassSubSectionContext.Provider>
  );
};
