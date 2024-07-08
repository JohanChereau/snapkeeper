import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
