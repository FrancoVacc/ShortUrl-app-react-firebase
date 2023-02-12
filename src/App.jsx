import { Routes, Route } from "react-router-dom";
import { useUserContext } from "./context/UserProvider";

import Navbar from "./components/Navbar";

import LayoutContainerForm from "./layout/LayoutContainerForm";
import LayoutRequireAuth from "./layout/LayoutRequireAuth";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";
import ButtonLoading from "./components/ButtonLoading";
import LayoutRedirect from "./layout/LayoutRedirect";

function App() {
  const { user } = useUserContext();

  if (user === false) {
    return <ButtonLoading />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />}></Route>
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
