import IssueStatusBadge from "@/app/component/IssueStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </>
  );
};

export default IssueDetails;
