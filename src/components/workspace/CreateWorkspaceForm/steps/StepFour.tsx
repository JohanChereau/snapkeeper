import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

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

export default StepFour;
