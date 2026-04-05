import { Card, CardContent } from "@/components/ui/card"
import { Users, MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useQuery } from "@apollo/client/react"
import { GET_STUDENTS } from "@/graphql/students"

type Student = {
    id: string
    name: string
    creditsCompleted: number
}

type GetStudentsData = {
    students: Student[]
}

export default function StudentTable() {
    const { data, loading, error } = useQuery<GetStudentsData>(GET_STUDENTS)

    const students = data?.students ?? []

    return (
        <Card className="w-full h-auto min-w-[25rem] max-w-full rounded-3xl border border-border bg-card shadow-sm">
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Users className="h-6 w-6 text-primary" strokeWidth={2.3} />
                        </div>
                        <p className="text-xl font-medium tracking-tight text-card-foreground">
                            View All Students
                        </p>
                    </div>

                    <p className="max-w-md text-sm leading-6 text-muted-foreground">
                        View and manage all students in the table
                    </p>

                    {loading && (
                        <p className="text-sm text-muted-foreground">Loading students...</p>
                    )}

                    {error && (
                        <p className="text-sm text-destructive">
                            Error loading students.
                        </p>
                    )}

                    {!loading && !error && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Credits</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {students.length > 0 ? (
                                    students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.id}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.creditsCompleted}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="size-8">
                                                            <MoreHorizontalIcon />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => console.log("edit", student.id)}>
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            variant="destructive"
                                                            onClick={() => console.log("delete", student.id)}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                            No students found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}