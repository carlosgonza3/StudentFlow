import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

type BrandHeaderProps = {
    title?: string
    subtitle?: string
    className?: string
}

export function BrandHeader({
                                title = "Scholar Admin",
                                subtitle = "Editorial Portal",
                                className,
                            }: BrandHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4 min-w-0",
                "max-[640px]:gap-3",
                className
            )}
        >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
                <h1 className="text-xl font-medium leading-tight tracking-tight text-slate-950 whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                </h1>
                <p className="text-base font-normal leading-tight text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}