import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect, SelectOption } from "@/components/ui/multi-select";
import { FormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

const availableExtensions: SelectOption[] = [
  { value: ".jpg", label: ".jpg" },
  { value: ".png", label: ".png" },
  { value: ".gif", label: ".gif" },
  { value: ".pdf", label: ".pdf" },
  { value: ".docx", label: ".docx" },
  { value: ".xlsx", label: ".xlsx" },
];

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
            <MultiSelect
              name={field.name}
              value={
                (field.value || []).map((val) => ({
                  value: val,
                  label: val,
                })) as SelectOption[]
              }
              onChange={(selectedOptions) => {
                field.onChange(selectedOptions.map((option) => option.value));
              }}
              options={availableExtensions}
              placeholder="Select file types to exclude"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StepFour;
