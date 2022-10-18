import React from "react";
import "../styles/Form.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    // newData.append("songWriters0", "49form");
    // newData.append("performer0", "49form");
    newData.append("photos", data.picture.file);
    newData.append("song0", data.song.file);

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
            <p className="form-bg__header">opis artystyczny zespołu</p>
            <textarea
              className="form-textarea"
              placeholder="opis artystyczny zespołu..."
              {...register("text", { required: true, minLength: 200 })}
            />
            {errors.text && <p>opis za krótki</p>}
          </div>
        </div>
        <div className="row">
          <div className="row-2">
            <div className="row-md">
              <p className="form-bg__header">Twój email</p>
              <input
                className="form-control"
                type="email"
                placeholder="-"
                {...register("email")}
              ></input>
            </div>
            <div className="row-md">
              <p className="form-bg__header">Dodaj obrazek</p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("picture")}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-md">
              <p className="form-bg__header">Dodaj oświadczenie</p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("statement")}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="row-md">
              <p className="form-bg__header">Twój podpis</p>
              <input
                className="form-control"
                type="text"
                placeholder="-"
                {...register("signature")}
              ></input>
            </div>
            <div className="row-md">
              <p className="form-bg__header">Dodaj piosenkę</p>
              <div className="form-group form-control">
                <label>Przeglądaj</label>
                <div>
                  <input
                    className="form-control-file"
                    type="file"
                    {...register("song")}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-md">
              <div className="checkbox-rules">
                <label htmlFor="chceckbox-1"></label>
                <input id="chceckbox-1" type="checkbox"></input>
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
    </div>
  );
}

export default Form;
