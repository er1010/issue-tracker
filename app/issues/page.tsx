import React from "react";
import IssuesTable from "./IssuesTable";
import Link from "next/link";

const IssuePage = () => {
  return (
    <div className="flex flex-col p-4 gap-2">
      <Link href="/issues/new">
        <button className="btn btn-primary">Create Issue</button>
      </Link>
      <IssuesTable />
    </div>
  );
};

export default IssuePage;
