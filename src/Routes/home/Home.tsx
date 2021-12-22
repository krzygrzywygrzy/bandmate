import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { load } from "../../store/reducers/userReducer";

const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: load });
  }, []);

  return <div>{JSON.stringify(auth)}</div>;
};

export default Home;
