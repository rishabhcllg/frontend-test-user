import { RecoilRoot } from "recoil";
import Todos from "./components/Todos";
import Users from "./components/Users";
import JobBoard from "./components/JobBoard";

const App = () => {
    return (
        <RecoilRoot>
            <div className="flex flex-col w-screen h-screen items-center justify-center bg-blue-200">
                {/* <Users></Users> */}
                {/* <Todos></Todos> */}
                <JobBoard></JobBoard>
            </div>
        </RecoilRoot>
    )
}

export default App;