"use client";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const route = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    route.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="3">
      <Button
        color="gray"
        variant="soft"
        onClick={() => changPage(currentPage - 1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changPage(currentPage + 1)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
