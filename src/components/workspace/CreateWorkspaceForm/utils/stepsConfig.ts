import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import StepFour from "../steps/StepFour";
import StepFive from "../steps/StepFive";
import { Step } from "@/ts/types/step";

export const steps: Step[] = [
  {
    id: 0,
    component: StepOne,
    title: "Basic Details",
    description: "Enter the name and description of your workspace.",
  },
  {
    id: 1,
    component: StepTwo,
    title: "Select Location",
    description: "Choose the folder location for your workspace.",
  },
  {
    id: 2,
    component: StepThree,
    title: "Naming Options",
    description: "Customize folder names and preview the structure.",
  },
  {
    id: 3,
    component: StepFour,
    title: "Exclude File Types",
    description: "Select file extensions to exclude from sorting.",
  },
  {
    id: 4,
    component: StepFive,
    title: "Review & Create",
    description: "Review all settings before creating your workspace.",
  },
];
