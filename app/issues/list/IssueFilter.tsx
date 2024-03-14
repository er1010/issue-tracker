"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const statuses: { lable: string; value?: Status }[] = [
    { lable: "All" },
    { lable: "Open", value: "OPEN" },
    { lable: "Closed", value: "CLOSED" },
    { lable: "In Progress", value: "IN_PROGRESS" },
  ];

  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        if (status === " ") router.push("/issues/list");
        const query = `?status=${status}`;
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || " "}>
            {status.lable}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
