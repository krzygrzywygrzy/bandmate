import React from "react";
import Spotify from "react-spotify-embed";
import isValidUrl from "../../core/isValidUrl";
import User from "../../models/User";
import SelectiveButton from "../button/SelectiveButton";
import { BiDislike, BiLike } from "react-icons/bi";
import { useAppDispatch } from "../../store/hooks";
import { thunkSwipe } from "../../store/actions/musiciansActions";

interface Props {
  user: User;
  likeable?: boolean;
}

const UserCard: React.FC<Props> = ({ user, likeable }) => {
  const dispatch = useAppDispatch();

  const handleSwipe = (like: boolean) => dispatch(thunkSwipe(like));

  return (
    <div className={`user-card w-full sm:w-xl`}>
      <div className={`${likeable ? "h-xl" : "h-96"}`}>
        <img
          className={` object-cover rounded shadow-lg ${
            likeable ? "h-xl" : "h-96"
          }`}
          alt={`${user.name}'s profile`}
          src="http://images6.fanpop.com/image/photos/39000000/Bring-Me-The-Horizon-Halloween-s-Concert-in-Southampton-bring-me-the-horizon-39006104-970-645.jpg"
        />
      </div>
      {likeable && (
        <div className="mt-4 flex justify-center items-center">
          <div
            className="text-purple-600 like-button"
            onClick={() => handleSwipe(true)}
          >
            <BiLike size={30} />
          </div>
          <div className="like-button" onClick={() => handleSwipe(false)}>
            <BiDislike size={30} />
          </div>
        </div>
      )}
      <div className="p-2">
        <div className={`${likeable ? "text-xl" : "text-base"} my-2`}>
          {user.name} {user.surname}
        </div>
        <div className={`mb-2 ${likeable ? "text-base" : "text-sm"}`}>
          {user.description}
        </div>
        <div className="mb-2">
          {user.instruments!.map((instrument, index) => {
            return (
              <SelectiveButton label={instrument} key={index} selected={true} />
            );
          })}
        </div>
        {likeable && <div className="border-b mb-2"></div>}
        {likeable && (
          <div className="mb-2">
            {user.genres!.map((genre, index) => {
              return (
                <SelectiveButton label={genre} key={index} selected={true} />
              );
            })}
          </div>
        )}

        {likeable && <div className="border-b mb-2"></div>}
      </div>
      {user.spotify && isValidUrl(user.spotify) && likeable && (
        <Spotify
          link={user.spotify}
          className={`w-full sm:mx-0 my-2 ${likeable ? "sm:w-xl" : "sm:w-72"}`}
        />
      )}
    </div>
  );
};

export default UserCard;
