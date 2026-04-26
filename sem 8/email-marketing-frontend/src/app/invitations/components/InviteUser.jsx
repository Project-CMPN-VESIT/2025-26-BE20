import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import authAxios from "../../../config/AuthAxios";
import { Button } from "../../../components/form-elements/Button";
import { CustomInput } from "../../../components/form-elements/CustomInput";

const InviteUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const payload = {
      invitation: {
        email: data.email,
        role: data.role,
      },
      redirect_url: `${window.location.origin}/invitation/accept-invitation`,
    };

    setLoading(true);

    try {
      const response = await authAxios.post(
        "/invitation/create-invitation",
        payload
      );
      //   if (response.status === 200) {
      toast.success(response.data.message || 'Invitation sent successfully');
      //   }
      reset();
    } catch (e) {
      const firstErrorMessage =
        Object.values(e?.response?.data?.errors || {})?.[0]?.[0]
        ?? "Validation failed";

      console.log(firstErrorMessage);

      toast.error(
        firstErrorMessage || "Failed to send invitation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        Invite Team Member
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <CustomInput
          label="Email address"
          type="email"
          name="email"
          register={register}
          validations={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          }}
          errors={errors.email}
        />

        {/* Role */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            Role
          </label>

          <select
            {...register("role", { required: "Role is required" })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select role</option>
            <option value="workspace_admin">Workspace Admin</option>
            <option value="marketer">Marketer</option>
            <option value="viewer">Viewer</option>
          </select>

          {errors.role && (
            <p className="mt-1 text-danger">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          label="Send Invitation"
          loading={loading}
          isFullWidth
          styleClass="w-full py-2 rounded-md bg-[#2F8481] text-white font-semibold"
        />
      </form>
    </div>
  );
};

export default InviteUser;
