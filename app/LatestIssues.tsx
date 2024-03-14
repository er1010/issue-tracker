import React from "react";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import IssueStatusBadge from "./component/IssueStatusBadge";
import NextLink from "next/link";

const LatestIssues = async () => {
  const issue = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issue.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction="column" gap="2" align="start">
                  <NextLink href={`/issue/${issue.id}`}>{issue.title}</NextLink>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
