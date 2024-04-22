import { issueSchema } from "@/app/api/issues/route";
import "easymde/dist/easymde.min.css";
import { z } from "zod";
import IssueForm from "../_component/IssueForm";

type Inputs = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
