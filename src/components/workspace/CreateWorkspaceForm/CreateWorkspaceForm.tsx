import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { steps } from "./utils/stepsConfig";
import { combinedSchema, FormData } from "./utils/validationSchemas";
import ProgressStepper from "@/components/ui/progress-stepper";
import FormNavigation from "@/components/ui/form-navigation";
import { FormRootError } from "@/components/ui/form";
import availableMonths from "@/../shared/utils/dates/months.json";
import { SupportedLanguages } from "@/ts/types/folder-structure";
import { invoke } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const saveWorkspace = async (formData: FormData) => {
  try {
    await invoke("save_workspace", { config: formData });
  } catch (error) {
    throw error;
  }
};

const CreateWorkspaceForm = () => {
  // Manage dynamic languages
  const availableLanguages = Object.keys(
    availableMonths
  ) as SupportedLanguages[];
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
      excludeExtensions: [],
    },
  });

  const { currentStep, handleNext, handleBack } = useFormNavigation(
    steps,
    methods
  );
  const delta = currentStep - (currentStep > 0 ? currentStep - 1 : 0);

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      await saveWorkspace(data);
      toast({
        title: "Workspace Created",
        description: `The workspace "${data.name}" has been successfully created.`,
      });
      methods.reset();
      navigate("/");
    } catch (error: any) {
      methods.setError("root", {
        message:
          error?.message ||
          "An unexpected error occurred while creating the workspace. Please try again.",
      });
      toast({
        title: "Error Creating Workspace",
        description:
          "There was an issue creating your workspace. Please check your details and try again.",
      });
      console.error("Error submitting form: ", error);
    }
  };

  // Determine the component for the current step
  const CurrentStepComponent = steps[currentStep]?.component || null;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-12 max-w-[800px] w-full h-full mx-auto">
      <ProgressStepper currentStep={currentStep} steps={steps} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8 overflow-x-hidden"
        >
          <motion.div
            key={currentStep}
            initial={{ x: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-1"
          >
            <div className="space-y-2 mb-12">
              <h2 className="text-xl sm:text-2xl font-bold">
                {steps[currentStep]?.title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep]?.description}
              </p>
            </div>

            {CurrentStepComponent && <CurrentStepComponent />}
          </motion.div>

          <FormRootError />
        </form>
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
