import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";
import FileInput from "@/components/ui/file-input";

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
            <FileInput {...field} directory={true} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StepTwo;
