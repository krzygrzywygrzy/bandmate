import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { thunkLogIn } from "../../store/actions/userActions";

const Login: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {}, []);

  //const handleLogIn = () => dispatch();

  return (
    <div>
      <div className="text-center mt-2 mb-8 font-semibold text-2xl text-purple-600">
        Log In
      </div>
      <input type="text" className="text-input mb-2" placeholder="Email..." />
      <input type="text" className="text-input" placeholder="Password..." />
      <div className="black-button">
        {user.loading ? "Loading..." : "Log In"}
      </div>
    </div>
  );
};

export default Login;
