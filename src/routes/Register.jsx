//dependencias
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

//Componentes
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import signin from "../img/signin.jpg";

const Register = () => {
  const { registerUser } = useUserContext();
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[45%] m-auto p-4 bg-white border border-gray-400 rounded-lg">
      <div className="flex items-center">
        <div className="text-center w-72">
          <Title text={"Sign In"} />
        </div>
        <img src={signin} alt="" className=" w-40 h-40" />
      </div>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="ex: test@test.com"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label={"Email"}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="ex: 123123"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label={"Password"}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="ex: 123123"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label={"Rewrite your password"}
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>

        <div className="text-center">
          {loading ? (
            <ButtonLoading />
          ) : (
            <Button text={"Sign In"} type={"submit"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
