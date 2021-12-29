import React, { useEffect } from "react";
import UserCard from "../../components/cards/UserCard";
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

  return (
    <main>
      {musicians.data.length > 0 ? (
        <div className=" flex">
          <div className="w-96">
            <UserCard user={musicians.data[0]} likeable={true} />
          </div>
          <div className="flex overflow-x-hidden">
            <div className="ml-16 hidden sm:block">
              <UserCard user={musicians.data[0]} likeable={false} />
            </div>
            <div className="ml-16 hidden sm:block">
              <UserCard user={musicians.data[0]} likeable={false} />
            </div>
            <div className="ml-16 hidden sm:block">
              <UserCard user={musicians.data[0]} likeable={false} />
            </div>
            <div className="ml-16 hidden sm:block">
              <UserCard user={musicians.data[0]} likeable={false} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span className="text-3xl font-semibold">It is all for now</span>
          <br />
          <span>you can still come back later...</span>
        </div>
      )}
    </main>
  );
};

export default HomeSwiping;
