import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RegisterData from "../../models/auth/RegisterData";

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterData>();

  return (
    <div className="site-container">
      <header className="my-12 text-2xl">
        <span className="text-purple-600 font-semibold text-5xl">Join </span>
        BandMate
      </header>
      <main>
        <section>
          <span className="text-xl">First enter your basic data...</span>
          <br />
          <input
            type="text"
            className="register-text-input my-2"
            placeholder="Name"
            {...register("name")}
          />
          <input
            type="text"
            className="register-text-input my-2"
            placeholder="Surname"
            {...register("surname")}
          />
        </section>
        <section className="my-12">
          <span className="text-xl">Now provide some contact...</span>
          <br />
          <span className="text-xl">and authorization data</span>
          <br />
          <input
            type="text"
            className="register-text-input my-2"
            placeholder="Email"
            {...register("email")}
          />
          <input
            type="password"
            className="register-text-input my-2"
            placeholder="Password"
            {...register("password")}
          />
        </section>
        <button className="black-button w-full sm:w-96">Join</button>
      </main>
    </div>
  );
};

export default Register;
