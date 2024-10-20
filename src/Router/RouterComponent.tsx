import { Route, Routes } from "react-router-dom"
import App from "../App"
import { StarComponent } from "../ChallengeComponents/StartComponent/StarComponent"
import { SortableListComponent } from "../ChallengeComponents/SortableList/SortableListComponent"

export const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/star" element={<StarComponent />}/>
            <Route path="sortList" element = {<SortableListComponent/ >} />
        </Routes>
    )
}