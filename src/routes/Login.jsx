//Dependencias
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
import { useState } from "react";
import ButtonLoading from "../components/ButtonLoading";
import login from "../img/login.jpg";

const Login = () => {
  const { logInUser, logInUserGoogle } = useUserContext();
  const navigate = useNavigate();

  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await logInUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  const logInWithGoogle = async () => {
    try {
      await logInUserGoogle();
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleClickGoogleAuth = () => {
    logInWithGoogle();
  };

  return (
    <div className=" w-60 md:w-[40%] m-auto p-4 bg-white border border-gray-400 rounded-lg">
      <div className="flex items-center">
        <div className="text-center w-72">
          <Title text={"Login"} />
        </div>
        <img src={login} alt="" className=" hidden md:block w-40 h-40" />
      </div>
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

        <div className="flex justify-between">
          {loading ? (
            <ButtonLoading />
          ) : (
            <Button text={"LogIn"} type={"submit"} />
          )}
          <Button
            text={"Google LogIn"}
            type={"button"}
            color={"red"}
            onClick={handleClickGoogleAuth}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
