import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/autoOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="space-y-3">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Grid columns="1" gap="3" width="max-content">
            <AssigneeSelect issue={issue} />
            <IssueEditButton issueID={issue.id} />
            <DeleteIssueButton issueID={issue.id} />
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: `details of issue #${issue?.id}`,
  };
}

export default IssueDetailPage;
