import React, { useEffect } from "react";
import "../styles/Form.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import SuccessMsg from "./SuccessMsg";

const schema = yup.object().shape({
  text: yup
    .string()
    .test(
      "required",
      "opis zespołu musi zawierać przynajmniej 100 znaków",
      (value) => value.length >= 100
    ),
  email: yup
    .string()
    .email("email nie jest poprawny")
    .test("required", "uzupełnij email", (value) => value.length > 0),
  signature: yup
    .string()
    .test("required", "uzupełnij swój podpis", (value) => value.length > 1),
  picture: yup
    .mixed()
    .test("required", "dodaj plik", (value) => value.length > 0)
    .test("fileSize", "Plik nie może przekraczać 2MB", (value) => {
      return value.length && value[0].size <= 2000000;
    })
    .test("type", "tylko pliki png, jpg, jpeg", (value) => {
      return (
        value.length &&
        ["image/png", "image/jpg", "image/jpeg"].includes(value[0].type)
      );
    }),
  statement: yup
    .mixed()
    .test("required", "dodaj plik", (value) => value.length > 0)
    .test("type", "tylko pliki pdf", (value) => {
      return value.length && ["application/pdf"].includes(value[0].type);
    }),
  song: yup
    .mixed()
    .test("required", "dodaj plik", (value) => value.length > 0)
    .test("fileSize", "Plik nie może przekraczać 10MB", (value) => {
      console.log(value);
      return value.length && value[0].size <= 10000000;
    })
    .test("type", "tylko pliki mp3", (value) => {
      return (
        value.length && ["audio/mp3", "audio/mpeg"].includes(value[0].type)
      );
    }),
  chqbx: yup.boolean().test("chqbx", "zaakcepuj regulamin", (value) => {
    return value;
  }),
});

function FormCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSubmitSuccessful) {
        reset();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    const newData = new FormData();
    newData.append("formGroup", 49);
    newData.append("firstName", "4-competitor");
    newData.append("lastName", data.signature);
    newData.append("nick", "49-advert");
    newData.append("email", data.email);
    newData.append("rulesConsent", true);
    newData.append(
      "extraFieldsJson",
      '{"competition": "będzie głośno", "year": 2022}'
    );
    newData.append("title0", data.text);
    newData.append("photos", data.picture[0]);
    newData.append("song0", data.song[0]);
    newData.append("documents", data.statement[0]);

    axios
      .post("https://formularze.polskieradio.pl/saveform", newData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.newData);
      })
      .catch((error) => {
        console.log(error.newData);
      });
  };
  return (
    <div className="formCard">
      <form className="form-bg" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="row-lg">
            <p className="form-bg__header form-bg__required">
              Opis artystyczny zespołu
            </p>
            <textarea
              className="form-textarea"
              placeholder="opis artystyczny zespołu..."
              {...register("text", { required: true })}
            />
            <div className="errors">
              {errors.text && <p>{errors.text.message}</p>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row-2">
            <div className="row-md">
              <p className="form-bg__header form-bg__required">Twój email</p>
              <input
                className="form-control"
                type="email"
                placeholder="-"
                {...register("email", { required: true })}
              ></input>
              <div className="errors">
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>
            <div className="row-md">
              <p className="form-bg__header form-bg__required">Dodaj obrazek</p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("picture", { required: true })}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {errors.picture && <p>{errors.picture.message}</p>}
              </div>
            </div>
            <div className="row-md">
              <p className="form-bg__header form-bg__required">
                Dodaj oświadczenie
              </p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("statement", { required: true })}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {errors.statement && <p>{errors.statement.message}</p>}
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="row-md">
              <p className="form-bg__header form-bg__required">Twój podpis</p>
              <input
                className="form-control"
                type="text"
                placeholder="-"
                {...register("signature", { required: true })}
              ></input>
              <div className="errors">
                {errors.signature && <p>{errors.signature.message}</p>}
              </div>
            </div>
            <div className="row-md">
              <p className="form-bg__header form-bg__required">
                Dodaj piosenkę
              </p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("song", { required: true })}
                  ></input>
                </div>
              </div>
              <div className="errors">
                {errors.song && <p>{errors.song.message}</p>}
              </div>
            </div>
            <div className="row-md">
              <div className="checkbox-rules">
                <label htmlFor="chqbx"></label>
                <input
                  id="chqbx"
                  type="checkbox"
                  {...register("chqbx", { required: true })}
                ></input>
                <p className="checkbox-rules__text">
                  Zgadzam się z{" "}
                  <a
                    href="https://static.prsa.pl/5cd599b1-f46b-40e9-9e23-7c8e4b5dae79.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    regulaminem
                  </a>{" "}
                  i akceptuję jego postanowienia
                </p>
              </div>
              <div className="errors">
                {errors.chqbx && <p>{errors.chqbx.message}</p>}
              </div>
              <div className="send-btn__wrapper">
                <button className="send-btn" type="submit">
                  Wyślij
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row-lg">
            <div className="statement-box">
              <a
                href="https://static.prsa.pl/8f1a6253-e181-4c6a-8bc8-607fd4ea0166.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <span></span>Tu możesz pobrać plik oświadczenia
              </a>
            </div>
          </div>
        </div>
      </form>
      {isSubmitSuccessful && <SuccessMsg />}
    </div>
  );
}

export default FormCard;
