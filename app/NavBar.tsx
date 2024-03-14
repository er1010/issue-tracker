"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const NavBar = () => {
  const currpath = usePathname();

  const links = [
    { lable: "Dashboard", href: "/" },
    { lable: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>

            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currpath,
                      "text-zinc-500": link.href !== currpath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.lable}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            <AuthStatus />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "authenticated")
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            className="cursor-pointer"
            size="2"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  return <Link href="/api/auth/signin">Sign In</Link>;
};

export default NavBar;
