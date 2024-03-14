import IssueStatusBadge from "@/app/component/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
  issues: Issue[];
}

export const IssueTable = async ({ issues, searchParams }: Props) => {
  const cols: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
    { label: "Assigned to", value: "assignedToUserId" },
  ];

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {cols.map((col) => (
            <Table.ColumnHeaderCell key={col.value}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: col.value },
                }}
              >
                {col.label}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id} className="hover:bg-slate-50">
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </Table.Cell>
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>

            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            <Table.Cell>{issue.assignedToUserId}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
