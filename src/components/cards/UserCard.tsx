import React from "react";
import Spotify from "react-spotify-embed";
import isValidUrl from "../../core/isValidUrl";
import User from "../../models/User";
import SelectiveButton from "../button/SelectiveButton";

interface Props {
  user: User;
  likeable?: boolean;
}

const UserCard: React.FC<Props> = ({ user, likeable }) => {
  return (
    <div className={`user-card w-full ${likeable ? " sm:w-96" : "w-72"}`}>
      <div className={`${likeable ? "h-xl" : "h-96"}`}>
        <img
          className={` object-cover rounded shadow-lg ${
            likeable ? "h-xl" : "h-96"
          }`}
          alt={`${user.name}'s profile`}
          src="http://images6.fanpop.com/image/photos/39000000/Bring-Me-The-Horizon-Halloween-s-Concert-in-Southampton-bring-me-the-horizon-39006104-970-645.jpg"
        />
      </div>
      <div className="p-2">
        <div className={`${likeable ? "text-xl" : "text-base"} my-2`}>
          {user.name} {user.surname}
        </div>
        <div className={`mb-2 ${likeable ? "text-base" : "text-sm"}`}>
          {user.description}
        </div>
        <div className="mb-2">
          {user.instruments.map((instrument, index) => {
            return (
              <SelectiveButton label={instrument} key={index} selected={true} />
            );
          })}
        </div>
        <div className="border-b mb-2"></div>
        <div className="mb-2">
          {user.genres.map((genre, index) => {
            return (
              <SelectiveButton label={genre} key={index} selected={true} />
            );
          })}
        </div>

        <div className="border-b mb-2"></div>
      </div>
      {user.spotify && isValidUrl(user.spotify) && (
        <Spotify
          link={user.spotify}
          className={`w-full sm:mx-0 my-2 ${likeable ? "sm:w-96" : "sm:w-72"}`}
        />
      )}
    </div>
  );
};

export default UserCard;
