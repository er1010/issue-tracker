import Pagination from "@/app/component/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Container } from "@radix-ui/themes";
import { IssueTable } from "./IssueTable";
import IssueStatusFilter from "./IssueFilter";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const cols: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
    { label: "Assigned to", value: "assignedToUserId" },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = cols.map((col) => col.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status: status } });

  return (
    <Container>
      <div>
        <IssueStatusFilter />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Box mt="3">
          <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={issueCount}
          />
        </Box>
      </div>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue List",
  description: "View all issues",
};

export default IssuesPage;
