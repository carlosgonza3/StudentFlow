import "./topbar.css"

import { SearchIcon, Settings, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

export function TopBar() {
    return (
        <div className="top-bar">
            <div className="left">
                <h1 className="brand-title">Student Flow</h1>

                <div className="search-wrapper">
                    <InputGroup>
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <SearchIcon size={22} />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>

            <div className="right">
                <button className="icon-btn notification-btn" type="button">
                    <Bell size={22} />
                </button>

                <button className="icon-btn settings-btn" type="button">
                    <Settings size={22} />
                </button>

                <Avatar className="user-avatar">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}