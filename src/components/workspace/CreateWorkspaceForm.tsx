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
import ProgressStepper from "@/components/ui/progress-stepper";
import { Step } from "@/ts/types/step";
import FormNavigation from "@/components/ui/form-navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewFolderStructure from "../ui/preview-folder-structure";
import availableMonths from "@/../shared/utils/dates/months.json";
import { SupportedLanguages } from "@/ts/types/folder-structure";

// Step schemas
const stepOneSchema = z.object({
  name: z.string().min(1, { message: "Workspace name is required" }),
  description: z
    .string()
    .max(500, { message: "Description is too long" })
    .optional(),
});

const stepTwoSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
});

const stepThreeSchema = z.object({
  yearFormat: z.string().min(1, { message: "Year format is required" }),
  monthFormat: z.string().min(1, { message: "Month format is required" }),
  language: z.string().min(1, { message: "Language is required" }),
});

const stepFourSchema = z.object({
  excludeExtensions: z.string().optional(),
});

const combinedSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);

type FormData = z.infer<typeof combinedSchema>;

const steps: Step[] = [
  {
    id: 0,
    title: "Basic Details",
    description: "Enter the name and description of your workspace.",
  },
  {
    id: 1,
    title: "Select Location",
    description: "Choose the folder location for your workspace.",
  },
  {
    id: 2,
    title: "Naming Options",
    description: "Customize folder names and preview the structure.",
  },
  {
    id: 3,
    title: "Exclude File Types",
    description: "Select file extensions to exclude from sorting.",
  },
  {
    id: 4,
    title: "Review & Create",
    description: "Review all settings before creating your workspace.",
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Description" />
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
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Select Folder Location" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const StepThree = () => {
  const { control, watch } = useFormContext<FormData>();
  const yearFormat = watch("yearFormat");
  const monthFormat = watch("monthFormat");

  // Watch the language field
  const language = watch("language") as SupportedLanguages;

  // Extract available languages from the JSON data
  const availableLanguages = Object.keys(
    availableMonths
  ) as SupportedLanguages[];

  // Check if the selected language is valid
  if (!availableLanguages.includes(language)) {
    console.error(`Invalid language selected: ${language}`);
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="yearFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Format</FormLabel>
            <FormControl>
              <Input {...field} placeholder="%YEAR%" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="monthFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Month Format</FormLabel>
            <FormControl>
              <Input {...field} placeholder="%MONTH_INDEX% - %MONTH_NAME%" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <PreviewFolderStructure
        yearFormat={yearFormat}
        monthFormat={monthFormat}
        language={language}
      />
    </div>
  );
};

const StepFour = () => {
  const { control } = useFormContext<FormData>();
  return (
    <FormField
      control={control}
      name="excludeExtensions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Exclude File Types</FormLabel>
          <FormControl>
            <Input {...field} placeholder="e.g., .jpg, .png" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const StepFive = () => {
  const { getValues } = useFormContext<FormData>();
  const values = getValues();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Workspace Settings</h3>
      <div>
        <h4 className="font-medium">Basic Details</h4>
        <p>
          <strong>Name:</strong> {values.name}
        </p>
        <p>
          <strong>Description:</strong> {values.description}
        </p>
      </div>
      <div>
        <h4 className="font-medium">Location</h4>
        <p>{values.location}</p>
      </div>
      <div>
        <h4 className="font-medium">Naming Options</h4>
        <p>
          <strong>Year Format:</strong> {values.yearFormat}
        </p>
        <p>
          <strong>Month Format:</strong> {values.monthFormat}
        </p>
        <p>
          <strong>Language:</strong> {values.language}
        </p>
      </div>
      <div>
        <h4 className="font-medium">Exclude File Types</h4>
        <p>{values.excludeExtensions}</p>
      </div>
    </div>
  );
};

const CreateWorkspaceForm = () => {
  // Extract available languages from the JSON data
  const availableLanguages = Object.keys(
    availableMonths
  ) as SupportedLanguages[];

  // Dynamically set the default language based on available languages
  const defaultLanguage = availableLanguages.includes("en-US")
    ? "en-US"
    : availableLanguages[0];

  const methods = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      yearFormat: "%YEAR%",
      monthFormat: "%MONTH_INDEX% - %MONTH_NAME%",
      language: defaultLanguage,
      excludeExtensions: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - (currentStep > 0 ? currentStep - 1 : 0);

  const validateStep = async (step: number) => {
    const schema = [
      stepOneSchema,
      stepTwoSchema,
      stepThreeSchema,
      stepFourSchema,
    ][step];
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
              {currentStep === 3 && <StepFour />}
              {currentStep === 4 && <StepFive />}
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
        isSubmitted={methods.formState.isSubmitSuccessful}
        onSubmit={methods.handleSubmit(onSubmit)}
        submitText="Create my workspace"
        submittingText="Creating my workspace..."
      />
    </div>
  );
};

export default CreateWorkspaceForm;
