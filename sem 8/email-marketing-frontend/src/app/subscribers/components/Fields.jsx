import React, { useEffect, useState } from "react";
import { Select } from "../../../components/form-elements/Select";
import { Button } from "../../../components/form-elements/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SubscriberNav from "./SubscriberNav";

const Fields = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [fields, setFields] = useState([]);
  
  const typeOptions = [
    { name: "Text", value: "TEXT" },
    { name: "Number", value: "NUMBER" },
    { name: "Date", value: "DATE" },
  ];
  useEffect(() => {
  const savedFields = JSON.parse(localStorage.getItem("fields")) || [];
    setFields(savedFields);
  }, []);

  const onSubmit = (data) => {
    const newField = {
      name: data.name,
      type: data.type.toUpperCase(),
      tag: `\${${data.name}}`,
    };
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    localStorage.setItem("fields", JSON.stringify(updatedFields));

    reset();
    setShowModal(false);
  };



  return (
    <div className="pl-1 pt-8">
<nav>
  <div className="flex flex-wrap justify-between items-center">
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">Subscribers</span>
    </div>
    <div className="flex items-center space-x-6 rtl:space-x-reverse">
      <Button
        type="button"
        styleClass="cursor-pointer w-full p-2 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
        label="Create Fields"
        onClick={() => setShowModal(true)}
      />
    </div>
  </div>
</nav>

<SubscriberNav />
<div className="mt-6 bg-white p-6 rounded shadow">
        {fields.length === 0 ? (
          <p className="text-gray-500">No fields yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="border-b text-primary border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Tag</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{field.name}</td>
                    <td className="px-6 py-4">{field.type}</td>
                    <td className="px-6 py-4">{field.tag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              <i className="ri-close-line"></i>
            </button>
            <h2 className="text-xl font-semibold mb-4">Create field</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter field name"
                  className="w-full border px-4 py-2 rounded"
                />
              </div>

              <Select
                label="Type"
                name="type"
                options={typeOptions}
                placeholder="Select Type"
                register={register}
                validation={{ required: true }}
              />

              <div className="flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded border"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-primary rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>
  );
};

export default Fields;
