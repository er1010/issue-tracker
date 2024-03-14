import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./list/IssueFilter";

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">new issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
