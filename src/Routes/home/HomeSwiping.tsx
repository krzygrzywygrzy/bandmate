import React, { useEffect } from "react";
import { thunkLoadMusicians } from "../../store/actions/musiciansActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const HomeSwiping: React.FC = () => {
  const dispatch = useAppDispatch();
  const musicians = useAppSelector((state) => state.musicians);

  useEffect(() => {
    dispatch(thunkLoadMusicians());
  }, [dispatch]);

  if (musicians.loading) {
    return <main>Loading...</main>;
  }

  if (musicians.error) {
    return <main>Error.... {musicians.error.message}</main>;
  }

  if (!musicians.data) {
    return <main></main>;
  }

  return <main>{JSON.stringify(musicians.data)}</main>;
};

export default HomeSwiping;
