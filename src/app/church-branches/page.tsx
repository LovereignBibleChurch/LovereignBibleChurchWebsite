import BranchesHeader from "@/components/branches/BranchesHeader"
import BranchList from "@/components/branches/BranchList"
import BranchMap from "@/components/branches/BranchMap"

export default function ChurchBranches() {
  return (
    <div className="container mx-auto px-4 py-12">
      <BranchesHeader />
      <BranchMap />
      <BranchList />
    </div>
  )
}
