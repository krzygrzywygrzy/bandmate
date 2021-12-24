import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { thunkLogIn } from "../../store/actions/userActions";
import { useLocation } from "wouter";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginData from "../../models/auth/LoginData";

//TODO: display info about errors in inputs

const Login: React.FC = () => {
  const [, setLocation] = useLocation();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<LoginData>();

  //redirect when user data is present
  useEffect(() => {
    if (user.data) setLocation("/home");
  }, [user]);

  const handleLogIn: SubmitHandler<LoginData> = (data) =>
    dispatch(thunkLogIn(data));

  return (
    <div>
      <div className="text-center mt-2 mb-8 ">
        <span>BandMate</span>
        <span className="ml-2 font-semibold text-2xl text-purple-600">
          Log In
        </span>
      </div>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <input
          type="text"
          className="text-input mb-2"
          placeholder="Email..."
          {...register("email", { required: true })}
        />
        <input
          type="password"
          className="text-input"
          placeholder="Password..."
          {...register("password", { required: true })}
        />
        {user.error && (
          <div className="text-center my-2 text-purple-600">
            {user.error.message}
          </div>
        )}
        <button className="black-button">
          {user.loading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
