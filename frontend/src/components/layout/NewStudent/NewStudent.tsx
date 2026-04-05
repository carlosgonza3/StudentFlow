import { UserPlus, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { ADD_STUDENT, GET_STUDENTS } from "@/graphql/students"

type AddStudentData = {
    addStudent: {
        id: string
        name: string
        creditsCompleted: number
    }
}

type AddStudentVars = {
    id: string
    name: string
    creditsCompleted: number
}

export function NewStudent() {
    const [studentId, setStudentId] = useState("")
    const [studentName, setStudentName] = useState("")
    const [studentCredits, setStudentCredits] = useState("")
    const [formError, setFormError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const [addStudent, { loading }] = useMutation<AddStudentData, AddStudentVars>(
        ADD_STUDENT,
        {
            refetchQueries: [{ query: GET_STUDENTS }],
        }
    )

    async function onSubmit() {
        setFormError("")
        setSuccessMessage("")

        const trimmedId = studentId.trim().toUpperCase()
        const trimmedName = studentName.trim()
        const trimmedCredits = studentCredits.trim()

        const idPattern = /^S\d+$/

        if (!trimmedId || !trimmedName || !trimmedCredits) {
            setFormError("Please complete all fields.")
            return
        }

        if (!idPattern.test(trimmedId)) {
            setFormError("Student ID must start with S and be followed by numbers only.");
            return
        }

        const creditsNumber = Number(trimmedCredits)

        if (!Number.isInteger(creditsNumber) || creditsNumber < 0) {
            setFormError("Credits must be a valid non-negative number.")
            return
        }

        try {
            await addStudent({
                variables: {
                    id: trimmedId,
                    name: trimmedName,
                    creditsCompleted: creditsNumber,
                },
            })

            setSuccessMessage("Student added successfully.")
            setStudentId("")
            setStudentName("")
            setStudentCredits("")
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Could not add student."

            if (message.toLowerCase().includes("already exists")) {
                setFormError("That student ID already exists.")
            } else {
                setFormError("Could not add student.")
            }
        }
    }

    return (
        <Card className="w-full h-auto min-w-[25rem] max-w-[55rem] rounded-3xl border border-border bg-card shadow-sm">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <UserPlus className="h-6 w-6 text-primary" strokeWidth={2.3} />
                    </div>
                    <p className="text-xl font-medium tracking-tight text-card-foreground">
                        New Student
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Student ID
                        </label>
                        <Input
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter ID (S-23)"
                            className="h-11 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Full Name
                        </label>
                        <Input
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Enter name"
                            className="h-11 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Credits
                        </label>
                        <Input
                            type="number"
                            value={studentCredits}
                            onChange={(e) => setStudentCredits(e.target.value)}
                            placeholder="Enter credits"
                            className="h-11 rounded-xl"
                        />
                    </div>
                </div>

                {formError && (
                    <p className="mt-4 text-sm font-medium text-destructive">
                        {formError}
                    </p>
                )}

                {successMessage && (
                    <p className="mt-4 text-sm font-medium text-green-600">
                        {successMessage}
                    </p>
                )}

                <div className="mt-6 flex justify-start md:justify-end">
                    <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        className="h-11 rounded-xl px-6 text-sm font-semibold"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "Adding..." : "Add Student Record"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}