import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ProgressStepper from "../ui/ProgressStepper";
import { Step } from "@/ts/types/step";
import FormNavigation from "./FormNavigation";

// Step schemas
const stepOneSchema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }),
  path: z.string().min(1, { message: "Workspace path is required" }),
});

const stepTwoSchema = z.object({
  sortingStructure: z
    .string()
    .min(1, { message: "Sorting structure is required" }),
});

const stepThreeSchema = z.object({
  namingOptions: z.string().min(1, { message: "Naming options are required" }),
});

// Combined schema
const combinedSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

type FormData = z.infer<typeof combinedSchema>;

const steps: Step[] = [
  {
    id: 0,
    title: "Basic Details",
    description: "Enter the basic details of the workspace.",
  },
  {
    id: 1,
    title: "Sorting Structure",
    description: "Define the sorting structure.",
  },
  {
    id: 2,
    title: "Naming Options",
    description: "Configure the naming options.",
  },
];

const StepOne = () => {
  const { control } = useFormContext<FormData>();
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workspace Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Workspace Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="path"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workspace Path</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Workspace Path" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const StepTwo = () => {
  const { control } = useFormContext<FormData>();
  return (
    <FormField
      control={control}
      name="sortingStructure"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sorting Structure</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Year/Month" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const StepThree = () => {
  const { control } = useFormContext<FormData>();
  return (
    <FormField
      control={control}
      name="namingOptions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Naming Options</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Prefix/Suffix" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CreateWorkspaceForm = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      name: "",
      path: "",
      sortingStructure: "",
      namingOptions: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - (currentStep > 0 ? currentStep - 1 : 0);

  const validateStep = async (step: number) => {
    const schema = [stepOneSchema, stepTwoSchema, stepThreeSchema][step];
    const fields = Object.keys(schema.shape);
    return await methods.trigger(fields as (keyof FormData)[]);
  };

  const handleNext = async () => {
    const valid = await validateStep(currentStep);
    if (!valid) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission logic here
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      methods.setError("root", {
        message: "submitted !",
      });
    } catch (error: any) {
      methods.setError("root", {
        message: error?.message || "An unknown error occurred",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="grid gap-12 max-w-[800px] w-full mx-auto">
      <ProgressStepper currentStep={currentStep} steps={steps} />

      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8 overflow-x-hidden"
          >
            <motion.div
              key={currentStep}
              initial={{ x: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="space-y-2 mb-12">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {steps[currentStep]?.title}
                </h2>
                <p className="text-muted-foreground">
                  {steps[currentStep]?.description}
                </p>
              </div>

              {currentStep === 0 && <StepOne />}
              {currentStep === 1 && <StepTwo />}
              {currentStep === 2 && <StepThree />}
            </motion.div>

            <FormRootError />
          </form>
        </Form>
      </FormProvider>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        handleBack={handleBack}
        handleNext={handleNext}
        isSubmitting={methods.formState.isSubmitting}
        onSubmit={methods.handleSubmit(onSubmit)}
        submitText="Create my workspace"
        submittingText="Creating my workspace..."
      />
    </div>
  );
};

export default CreateWorkspaceForm;
