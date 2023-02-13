import React, { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

import Button from "../components/Button";
import Title from "../components/Title";
import ButtonLoading from "../components/ButtonLoading";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import homeimg from "../img/home.jpg";
import Loader from "../components/Loader";

const Home = () => {
  const { required, patternURL } = formValidate();
  const [copy, setCopy] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginId, setNewOriginId] = useState();
  const [newName, setNewName] = useState("");

  console.log(data);

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async ({ url, name, enabled }) => {
    try {
      if (newOriginId) {
        await updateData(newOriginId, url, name, enabled);
        setNewOriginId(undefined);
        setNewName("");
      } else {
        await addData(url, name, enabled);
      }
      resetField("url");
      resetField("name");
      resetField("enabled", false);
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleUpdate = (item) => {
    console.log(item);
    setValue("url", item.origin);
    setValue("name", item.name);
    setValue("enabled", item.enabled);
    setNewOriginId(item.nanoid);
    setNewName(item.name);
  };

  const pathURL = window.location.href;
  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(pathURL + nanoid);
    setCopy({ [nanoid]: true });
  };

  if (loading.getData) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="md:w-[70%] w-80 m-auto px-10 py-4 bg-white border border-gray-400  rounded-lg">
        <div className="flex items-center">
          <div className="text-center w-96">
            <Title text={"My Url"} />
          </div>
          <img src={homeimg} alt="" className="  hidden md:block w-40 h-40" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="text"
            placeholder="Write the url's name"
            {...register("name", {
              required,
            })}
            label={"Url Name"}
            error={errors.name}
          >
            <FormError error={errors.name} />
          </FormInput>
          <FormInput
            type="text"
            placeholder="ex: https://example.com"
            {...register("url", {
              required,
              pattern: patternURL,
            })}
            label={"Url"}
            error={errors.url}
          >
            <FormError error={errors.url} />
          </FormInput>

          <div className="my-5">
            <label htmlFor="enabled" className="mb-2 text-sm font-medium mr-2">
              Show Url
            </label>
            <input {...register("enabled")} type="checkbox" name="enabled" />
          </div>

          {loading.addData ? (
            <ButtonLoading />
          ) : !newOriginId ? (
            <Button type={"submit"} text={"Add Url"}></Button>
          ) : (
            <Button type={"submit"} text={"Edit"} color={"blue"}></Button>
          )}
        </form>

        {data.map((item) => (
          <div
            key={item.nanoid}
            className="p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="text-xl font-bold md-1">{item.name}</p>
            <p className="text-xl font-bold md-1 text-gray-800">
              {item.nanoid}
            </p>
            {item.enabled == true ? (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.origin}
              </p>
            ) : (
              <p>*******************</p>
            )}
            <div className="flex space-x-2">
              {loading[item.nanoid] ? (
                <ButtonLoading />
              ) : (
                <Button
                  type={"button"}
                  text={"Delete"}
                  color={"red"}
                  onClick={() => handleDelete(item.nanoid)}
                />
              )}
              <Button
                type={"button"}
                text={"Update"}
                color={"blue"}
                onClick={() => handleUpdate(item)}
              />
              <Button
                type={"button"}
                text={copy[item.nanoid] ? "Copied" : "Copy"}
                color={"blue"}
                onClick={() => handleClickCopy(item.nanoid)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
