import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      {/* <h1 className="mt-3 fw-bold">Homepage</h1> */}
      <Outlet/>
    </>
  );
}
