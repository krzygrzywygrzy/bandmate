import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import Popup from "../../components/popups/Popup";
import RegisterData from "../../models/auth/RegisterData";
import { supabase } from "../../supabaseClient";
import { useLocation } from "wouter";

const Register: React.FC = () => {
  const [, setLocation] = useLocation();
  const { register, handleSubmit } = useForm<RegisterData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [successPopup, setSuccessPopup] = useState<boolean>(false);
  const handleRegister: SubmitHandler<RegisterData> = async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(
        { email: data.email, password: data.password },
        { data: { name: data.name, surname: data.surname } }
      );
      if (error) throw error;
      setError(undefined);
      setSuccessPopup(true);
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-container">
      <header className="header text-2xl">
        <span className="text-purple-600 font-semibold text-5xl">Join </span>{" "}
        BandMate
      </header>
      <main>
        <form onSubmit={handleSubmit(handleRegister)}>
          <section>
            <span className="text-xl">First enter your basic data...</span>
            <br />
            <input
              type="text"
              className="register-text-input my-2"
              placeholder="Name"
              {...register("name")}
            />
            <br />
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
            <br />
            <input
              type="password"
              className="register-text-input my-2"
              placeholder="Password"
              {...register("password")}
            />
          </section>
          {error && <div className="my-2 text-purple-600">{error}</div>}
          <button className="black-button w-full sm:w-96">
            {loading ? "Loading..." : "Join"}
          </button>
        </form>
      </main>
      <Popup trigger={successPopup}>
        <div className="popup-content">
          <div className="flex justify-end">
            <div
              className="icon-button"
              onClick={() => {
                setSuccessPopup(false);
                setLocation("/");
              }}
            >
              <IoCloseOutline size={24} />
            </div>
          </div>
          <div className="text-purple-600 font-semibold text-lg">Success!</div>
          <div>confirmation email has been sent...</div>
        </div>
      </Popup>
    </div>
  );
};

export default Register;
