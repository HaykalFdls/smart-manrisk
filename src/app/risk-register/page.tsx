import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const riskData = [
  {
    id: "RISK-001",
    description: "Data breach due to unauthorized access",
    category: "Cyber Security",
    impact: "High",
    likelihood: "Medium",
    owner: "IT Department",
    status: "Open",
  },
  {
    id: "RISK-002",
    description: "Credit default by a major client",
    category: "Credit Risk",
    impact: "High",
    likelihood: "Low",
    owner: "Finance Department",
    status: "Mitigated",
  },
  {
    id: "RISK-003",
    description: "Operational failure in the core banking system",
    category: "Operational Risk",
    impact: "Critical",
    likelihood: "Low",
    owner: "Operations Team",
    status: "In Progress",
  },
  {
    id: "RISK-004",
    description: "Non-compliance with new data privacy regulations",
    category: "Compliance",
    impact: "Medium",
    likelihood: "Medium",
    owner: "Legal Department",
    status: "Open",
  },
  {
    id: "RISK-005",
    description: "Market volatility affecting investment portfolio",
    category: "Market Risk",
    impact: "Medium",
    likelihood: "High",
    owner: "Treasury",
    status: "Closed",
  },
]

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Open: "destructive",
    "In Progress": "default",
    Mitigated: "secondary",
    Closed: "outline"
}

export default function RiskRegisterPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Risk Register</h1>
        <div className="ml-auto">
          <Button>
            <PlusCircle className="mr-2" />
            Add New Risk
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Identified Risks</CardTitle>
          <CardDescription>
            A comprehensive list of all risks identified across the organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskData.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>{risk.description}</TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>{risk.impact}</TableCell>
                  <TableCell>{risk.likelihood}</TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[risk.status] || "default"}>{risk.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Mitigate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
