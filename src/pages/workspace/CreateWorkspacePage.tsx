import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";

const CreateWorkspacePage = () => {
  return (
    <section>
      <h1 className="text-2xl font-bold my-12 text-center">
        Create a New Workspace
      </h1>
      <CreateWorkspaceForm />
    </section>
  );
};

export default CreateWorkspacePage;
