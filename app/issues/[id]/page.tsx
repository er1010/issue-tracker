import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issueDetail = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-3xl font-extrabold">{issueDetail?.title}</h1>
      <div className="flex items-center gap-1">
        {issueDetail?.createdAt.toDateString()}
        <div className="badge">{issueDetail?.status}</div>
      </div>
      <div>{issueDetail?.description}</div>
      <Link href={`/issues/${params.id}/edit`}>
        <button className="btn btn-primary">Edit Issue</button>
      </Link>
    </div>
  );
};

export default IssueDetailPage;
