
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./Routes/Routes";

function App() {
  return (
    <div className="min-h-screen bg-[#F2F6FC]">
      <RouterProvider router={Routes} />
    </div>
  );
}

export default App;
