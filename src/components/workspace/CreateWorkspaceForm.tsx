import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

const combinedSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

type FormData = z.infer<typeof combinedSchema>;

const steps = [
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
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Workspace Name</FormLabel>
            <FormControl>
              <Input placeholder="Workspace Name" {...field} />
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
              <Input placeholder="Workspace Path" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
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
            <Input placeholder="Year/Month" {...field} />
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
            <Input placeholder="Prefix/Suffix" {...field} />
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

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        {step === 0 && <StepOne />}
        {step === 1 && <StepTwo />}
        {step === 2 && <StepThree />}

        <div className="flex justify-between">
          {step > 0 && (
            <Button type="button" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateWorkspaceForm;
