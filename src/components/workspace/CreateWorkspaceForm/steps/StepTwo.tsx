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

export default StepTwo;
