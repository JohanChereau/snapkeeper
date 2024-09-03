import { useFormContext } from "react-hook-form";
import { CreateWorkspaceFormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

const StepFive = () => {
  const { getValues } = useFormContext<CreateWorkspaceFormData>();
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

export default StepFive;
