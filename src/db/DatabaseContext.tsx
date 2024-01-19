import { createContext, ReactNode, useContext } from "react";
import { getDatabaseService } from "./db";

const db = await getDatabaseService();

export type DatabaseContextProviderProps = {
  children: ReactNode;
};

// Cheating because this should never be used outside of context
export const databaseContext = createContext(db);

export const useDatabase = () => {
  const context = useContext(databaseContext);

  if (context === undefined) {
    throw new Error("useDatabaseContext was used outside of its Provider");
  }

  return context;
};

export const DatabaseContextProvider = (
  props: DatabaseContextProviderProps
) => {
  return (
    <databaseContext.Provider value={db}>
      {props.children}
    </databaseContext.Provider>
  );
};
