import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { load } from "../../store/reducers/authReducer";

const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: load });
  }, []);

  return <div>{JSON.stringify(auth)}</div>;
};

export default Home;
