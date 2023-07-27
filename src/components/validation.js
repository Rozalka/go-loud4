import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const validateField = async (el) =>
  new Promise((resolve) => {
    if (!el?.name) {
      resolve("Provide name");
    }
    if (!el?.file) {
      resolve("Provide file");
    }
    const url = URL.createObjectURL(el.file);
    const image = new Image();
    image.onload = () => {
      const valid = image.width <= 1000 && image.height <= 1000;
      URL.revokeObjectURL(url);
      resolve(valid ? true : "Image size is at most 1000 x 1000");
    };
    image.src = url;
  });

const FormElement = ({ i, errors, register, setValue }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState({
    file: null,
    width: null,
    height: null,
  });
  useEffect(() => {
    register(
      { name: `images[${i}]` },
      {
        required: { value: true, message: "Provide name and file" },
        validate: validateField,
      }
    );
    // did mount - empty array on purpose
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "inline-block" }}>
      <p>Image number {i}:</p>
      <input
        onChange={(event) => {
          const newName = event.target.value;
          setName(newName);
          setValue(`images[${i}]`, {
            name: newName,
            ...file,
          });
        }}
        placeholder="Name"
      />
      {errors.images?.[i]?.name?.message}
      <br />
      <input
        type="file"
        placeholder="File"
        onChange={(event) => {
          const file = event.target.files[0];
          const src = URL.createObjectURL(file);
          const image = new Image();
          image.onload = () => {
            const newFile = {
              file,
              width: image.width,
              height: image.height,
            };
            setFile(newFile);
            setValue(`images[${i}]`, {
              name,
              ...newFile,
            });
            URL.revokeObjectURL(src);
          };
          image.src = src;
        }}
      />
      <br />
      {errors.images?.[i]?.message}
    </div>
  );
};

export default function App() {
  const { register, handleSubmit, errors, setValue } = useForm();

  const [ids, setIds] = useState([]);
  const [images, setImages] = useState([]);

  const onSubmit = (data) => {
    setImages([
      ...images,
      ...data.images.map((img) => ({
        ...img,
        src: URL.createObjectURL(img.file),
      })),
    ]);
    setIds([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {ids.map((id, i) => (
          <FormElement
            i={i}
            errors={errors}
            register={register}
            setValue={setValue}
            key={id}
          />
        ))}
        <button
          type="button"
          onClick={() => setIds([...ids, new Date().getTime()])}
        >
          Add
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Images:
        <p>
          {images.map((el) => (
            <div style={{ display: "inline-block" }} key={el.name}>
              <strong>
                {el.name}, width: {el.width} and height: {el.height}
              </strong>
              <br />
              <img src={el.src} alt="" />
            </div>
          ))}
        </p>
      </p>
    </>
  );
}
