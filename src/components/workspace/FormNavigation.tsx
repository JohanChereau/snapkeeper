import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

type FormNavigationProps = {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  previousText?: string;
  nextText?: string;
  submitText?: string;
  submittingText?: string;
};

const FormNavigation = ({
  currentStep,
  totalSteps,
  handleBack,
  handleNext,
  onSubmit,
  isSubmitting,
  previousText = "Previous",
  nextText = "Next",
  submitText = "Submit",
  submittingText = "Submitting...",
}: FormNavigationProps) => (
  <div className="flex justify-between">
    <Button
      type="button"
      onClick={handleBack}
      disabled={currentStep === 0}
      className="mr-2"
      variant="secondary"
    >
      {previousText}
    </Button>
    {currentStep < totalSteps - 1 && (
      <Button
        type="button"
        onClick={handleNext}
        disabled={isSubmitting}
        className=""
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <LoaderCircleIcon className="animate-spin w-6 h-6" />
            <span>{submittingText}</span>
          </div>
        ) : (
          nextText
        )}
      </Button>
    )}
    {currentStep === totalSteps - 1 && (
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
        className=""
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <LoaderCircleIcon className="animate-spin w-6 h-6" />
            <span>{submittingText}</span>
          </div>
        ) : (
          submitText
        )}
      </Button>
    )}
  </div>
);

export default FormNavigation;
