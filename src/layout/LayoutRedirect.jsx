import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

import Title from "../components/Title";

const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const [loading, setLoading] = useState(true);

  const { searchData } = useFirestore();

  useEffect(() => {
    searchData(nanoid).then((docSnap) => {
      if (docSnap.exists()) {
        window.location.href = docSnap.data().origin;
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <Title text={"Redireccionando..."} />;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
