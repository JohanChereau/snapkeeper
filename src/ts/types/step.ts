import React from "react";

export interface Step {
  id: number;
  component: React.FC; // Composant fonctionnel de React
  title: string;
  description: string;
}
