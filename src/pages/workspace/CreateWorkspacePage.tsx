import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm/CreateWorkspaceForm";

const CreateWorkspacePage = () => {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-12 py-12 h-svh max-h-[1100px]">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Create a New Workspace
      </h1>
      <CreateWorkspaceForm />
    </section>
  );
};

export default CreateWorkspacePage;
