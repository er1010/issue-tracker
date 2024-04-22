import React from "react";
import prisma from "@/prisma/client";
import cn from "classnames";
import Link from "next/link";

const IssuesTable = async () => {
  const allIssues = await prisma.issue.findMany();

  return (
    <div>
      <div className="overflow-x-auto max-w-[800px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {allIssues.map((issue) => (
              <tr className="hover" key={issue.id}>
                <th>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </th>
                <td>
                  <div
                    className={cn(
                      "badge",
                      issue.status === "open"
                        ? "badge-primary"
                        : issue.status === "in_progress"
                        ? "badge-secondary"
                        : ""
                    )}
                  >
                    {issue.status}
                  </div>
                </td>
                <td>{issue.createdAt.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesTable;
