"use client";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/api/issues/route";
import { z } from "zod";

type Inputs = z.infer<typeof issueSchema>;


const NewIssuePage = () => {
  const route = useRouter();
  const { register, handleSubmit, control,formState:{errors,} } = useForm<Inputs>({
    resolver: zodResolver(issueSchema)
  });
  const onsubmit = async (data: Inputs) => {
    await fetch("/api/issues", { method: "POST", body: JSON.stringify(data) });
    route.push("/issues");
  };

  return (
    <form
      className="flex flex-col p-4 gap-4 max-w-[800px]"
      onSubmit={handleSubmit(onsubmit)}
    >
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full"
        {...register("title")}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <button className="btn btn-primary">Submit New Issue</button>
    </form>
  );
};

export default NewIssuePage;
