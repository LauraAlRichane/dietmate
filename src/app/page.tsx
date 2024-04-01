"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";


export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>();


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();
    console.log('file', file)

    try {
      const base64Image = preview?.toString().split(',') || '';
      console.log('base64 image after preview split', base64Image[1])
      const formData = new FormData(event.currentTarget);
      const data = await generateRecipe(base64Image[1], formData);
      const recipe = typeof data === "string" ? data : "No data returned";
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
    const reader = new FileReader;
    reader.onload = function() {
      setPreview(reader.result);
    }
    reader.readAsDataURL(target.files[0]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className=" pb-10 mx-auto text-center flex flex-col items-start -center max-w-3xl">
        <h1 className=" text-4xl  font-bold  text-gray-900 sm:text-6xl ">
          Meet Your Personal <span className=" text-blue-600"> Recipe AI </span>
          <p className=" mt-10 font-medium   text-lg  max-w-prose text-gray-900 ">
            Simply type few ingredients using the format ingredient1,
            ingredient12,..etc and Recipe AI will generate an all-new recipe on
            demand...
          </p>
        </h1>
      </div>

      <section className="   w-1/2  mx-auto ">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >
          <label for="type">Choose meal type:</label>
          <select name="type" id="type" className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl ">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <label for="schedule">Choose meal frequency:</label>
          <select name="schedule" id="schedule" className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl ">
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            {/* <option value="3">3 Days</option>
            <option value="4">4 Days</option>
            <option value="5">5 Days</option>
            <option value="6">6 Days</option> */}
          </select>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg"
            onChange={handleOnChange}
          />
          <img src={preview} />
          <button
            type="submit"
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
          >
            Generate
          </button>
        </form>
      </section>
      {loading ? (
        <div className="flex flex-col items-center gap-4 w-1/2  mx-auto ">
          <h2 className="m-10 font-medium   text-xl   max-w-prose text-blue-600 ">
            Wait for it...
          </h2>

        </div>
      ) : (
        <div>
          {result ? (
            <section className="    mt-10 mx-auto  border border-black  bg-gray-50  rounded-xl     ">
              <Card className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto text-xl  font-semibold    ">
                <h2 className="whitespace-pre-wrap">{result}</h2>
              </Card>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
