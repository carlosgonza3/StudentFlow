import './App.css'
import {TopBar} from "@/components/layout/TopBar/TopBar.tsx";
import {BrandHeader} from "@/components/layout/BrandHeader/BrandHeader.tsx";
import {LookupCard} from "@/components/layout/LookupCard/LookupCard.tsx";
import {NewStudent} from "@/components/layout/NewStudent/NewStudent.tsx";
import StudentTable from "@/components/layout/StudentTable/StudentTable.tsx";



function App() {

  return (
    <>
        <div className="app-container">
            <TopBar />
            <div className="w-full px-6 py-6 flex flex-col justify-start items-start gap-[1.3rem]">
                <BrandHeader />
                <p className="text-xl font-normal mt-6">
                    Student Management
                </p>
                <p className="text-base font-normal leading-tight text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis mb-7">
                    Manage student academic records.
                </p>
                <div className="h-stack">
                    <LookupCard/>
                    <NewStudent/>
                </div>
                <div className="h-stack">
                    <StudentTable/>
                </div>
            </div>

        </div>
    </>
  )
}

export default App
