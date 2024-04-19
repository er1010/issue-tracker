import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    NextResponse.json({ error: validation.error.errors }, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  // const body = await request.json();
  // const validation = issueSchema.safeParse(body);
  // if (!validation.success)
  //   NextResponse.json({ error: validation.error.errors }, { status: 400 });

  const allIssue = await prisma.issue.findMany({

  })
  

  return NextResponse.json(allIssue, { status: 201 });
}