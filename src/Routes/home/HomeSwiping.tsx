import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { load } from "../../store/reducers/musiciansReducer";

const HomeSwiping: React.FC = () => {
  const dispatch = useAppDispatch();
  const musicians = useAppSelector((state) => state.musicians);

  useEffect(() => {
    dispatch({ type: load });
  }, [dispatch]);

  if (musicians.loading) {
    return <main>Loading...</main>;
  }

  if (musicians.error || !musicians.data) {
    return <main>Error....</main>;
  }

  return <main></main>;
};

export default HomeSwiping;
