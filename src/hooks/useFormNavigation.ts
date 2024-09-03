import { useState } from "react";
import { Step } from "@/ts/types/step";
import {
  CreateWorkspaceFormData,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
} from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

export const useFormNavigation = (steps: Step[], methods: any) => {
  const [currentStep, setCurrentStep] = useState(0);

  const validateStep = async (step: number) => {
    const schema = [
      stepOneSchema,
      stepTwoSchema,
      stepThreeSchema,
      stepFourSchema,
    ][step];
    const fields = Object.keys(schema.shape);
    return await methods.trigger(fields as (keyof CreateWorkspaceFormData)[]);
  };

  const handleNext = async () => {
    const valid = await validateStep(currentStep);
    if (!valid) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return {
    currentStep,
    handleNext,
    handleBack,
    totalSteps: steps.length,
  };
};
