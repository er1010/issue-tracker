import { Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoading = () => {
  return (
    <div className="space-y-2 max-w-xl">
      <Skeleton width="10rem" height="2rem" />
      <Flex gap="4">
        <Skeleton width="3rem" />
        <Skeleton width="6rem" />
      </Flex>
      <Card>
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default IssueDetailLoading;
