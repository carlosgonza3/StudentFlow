import { Search, Fingerprint } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useLazyQuery } from "@apollo/client/react"
import { GET_STUDENT_BY_ID } from "@/graphql/students"

type Student = {
    id: string
    name: string
    creditsCompleted: number
}

type GetStudentByIdData = {
    student: Student | null
}

type GetStudentByIdVars = {
    id: string
}

export function LookupCard() {
    const [studentId, setStudentId] = useState("")
    const [formError, setFormError] = useState("")
    const [notFoundMessage, setNotFoundMessage] = useState("")
    const [displayedStudent, setDisplayedStudent] = useState<Student | null>(null)

    const [findStudent, { loading, error }] = useLazyQuery<
        GetStudentByIdData,
        GetStudentByIdVars
    >(GET_STUDENT_BY_ID, {
        fetchPolicy: "network-only",
    })

    async function onSubmit() {
        setFormError("")
        setNotFoundMessage("")
        setDisplayedStudent(null)

        const trimmedId = studentId.trim().toUpperCase()
        const idPattern = /^S\d+$/

        if (!trimmedId) {
            setFormError("Please enter a student ID.")
            return
        }

        if (!idPattern.test(trimmedId)) {
            setFormError("Student ID must start with S and be followed by numbers only.")
            return
        }

        try {
            const result = await findStudent({
                variables: {
                    id: trimmedId,
                },
            })

            const foundStudent = result.data?.student ?? null

            if (!foundStudent) {
                setNotFoundMessage("No student was found with that ID.")
                setDisplayedStudent(null)
                return
            }

            setDisplayedStudent(foundStudent)
        } catch {
            setDisplayedStudent(null)
            setNotFoundMessage("")
        }
    }

    return (
        <Card className="w-full h-auto min-w-[25rem] max-w-[55rem] rounded-3xl border border-border bg-card shadow-sm">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Search className="h-6 w-6 text-primary" strokeWidth={2.3} />
                    </div>
                    <p className="text-xl font-medium tracking-tight text-card-foreground">
                        Quick Lookup
                    </p>
                </div>

                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                    Search a student record by identification number.
                </p>

                <div className="mt-5 relative">
                    <Fingerprint className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={studentId}
                        onChange={(e) => {
                            setStudentId(e.target.value)
                            setFormError("")
                            setNotFoundMessage("")
                            setDisplayedStudent(null)
                        }}
                        placeholder="Enter student ID (S23)"
                        className="h-11 rounded-xl border-border bg-muted pl-12 pr-4 text-sm placeholder:text-muted-foreground"
                    />
                </div>

                {formError && (
                    <p className="mt-3 text-sm font-medium text-destructive">
                        {formError}
                    </p>
                )}

                {error && (
                    <p className="mt-3 text-sm font-medium text-destructive">
                        Error retrieving student.
                    </p>
                )}

                {notFoundMessage && !loading && !error && (
                    <p className="mt-3 text-sm font-medium text-muted-foreground">
                        {notFoundMessage}
                    </p>
                )}

                <div className="mt-6 flex justify-start md:justify-end">
                    <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        className="h-11 rounded-xl px-6 text-sm font-semibold"
                    >
                        {loading ? "Searching..." : "Find Student"}
                    </Button>
                </div>

                {displayedStudent && !loading && !error && (
                    <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Student ID
                                </p>
                                <p className="mt-1 text-sm font-medium text-card-foreground">
                                    {displayedStudent.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Full Name
                                </p>
                                <p className="mt-1 text-sm font-medium text-card-foreground">
                                    {displayedStudent.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Credits
                                </p>
                                <p className="mt-1 text-sm font-medium text-card-foreground">
                                    {displayedStudent.creditsCompleted}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}