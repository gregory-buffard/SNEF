import { useState } from "react";

let name = "";

export const useToQuery = () => {
  const [toQuery, setToQuery] = useState("Nom et prénom d'employé");

  return { toQuery, setToQuery };
};

export const workerName = (): string => {
  name = useToQuery().toQuery as string;
  return name as string;
};
