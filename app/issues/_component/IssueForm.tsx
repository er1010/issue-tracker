"use client";
import React from "react";
import { issueSchema } from "@/app/api/issues/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "module";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";

type Inputs = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue | null }) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(issueSchema),
  });
  const onsubmit = async (data: Inputs) => {
    if (issue)
      await fetch("/api/issues/" + issue.id, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    else
      await fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(data),
      });
    route.push("/issues");
  };

  return (
    <form
      className="flex flex-col p-4 gap-4 max-w-[800px]"
      onSubmit={handleSubmit(onsubmit)}
    >
      <input
        type="text"
        defaultValue={issue?.title}
        placeholder="Title"
        className="input input-bordered w-full"
        {...register("title")}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <button disabled={isSubmitting} className="btn btn-primary">
        {issue ? "Edit Issue" : "Submit New Issue"}{" "}
        {isSubmitting && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </button>
    </form>
  );
};

export default IssueForm;
