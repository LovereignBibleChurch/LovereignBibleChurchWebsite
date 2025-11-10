import BranchesPage from "@/components/branches/branchesPage";
import { getBranches } from "@/sanity/lib/queries";

export default async function ChurchBranches() {
  const branches = await getBranches();
  
  return <BranchesPage branches={branches} />
}
