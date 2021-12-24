import React, { useState } from "react";
import { useLocation } from "wouter";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginData from "../../models/auth/LoginData";
import { supabase } from "../../supabaseClient";

interface Props {
  close?: Function;
}

const Login: React.FC<Props> = ({ close }) => {
  const { register, handleSubmit } = useForm<LoginData>();
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | undefined>();
  const handleLogIn: SubmitHandler<LoginData> = async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      if (close) close();
      setLocation("/");
    } catch (error: any) {
      setErr(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

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
        {err && <div className="text-center my-2 text-purple-600">{err}</div>}
        <button className="black-button">
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
