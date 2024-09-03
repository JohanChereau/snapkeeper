import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm/CreateWorkspaceForm";

const CreateWorkspacePage = () => {
  return (
    <section className="flex flex-col h-full gap-12 mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Create a New Workspace
      </h1>
      <CreateWorkspaceForm />
    </section>
  );
};

export default CreateWorkspacePage;
