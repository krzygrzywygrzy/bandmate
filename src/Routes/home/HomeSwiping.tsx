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
          {/* {musicians.data.length > 1 && (
            <div className="hidden md:block ml-32 mr-16 ">Next in order...</div>
          )}
          <div className=" flex flex-row   overflow-x-scroll">
            {musicians.data.slice(1).map((musician) => {
              return (
                <div className="hidden sm:block">
                  <UserCard
                    user={musician}
                    key={musician.user_id}
                    likeable={false}
                  />
                </div>
              );
            })}
          </div> */}
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
