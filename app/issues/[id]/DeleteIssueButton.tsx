"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueID }: { issueID: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Issue Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  try {
                    await axios.delete(`/api/issues/${issueID}`);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            mt="2"
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
