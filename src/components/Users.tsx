import useGetUsers from "./useGetUsers";

const Users = () => {
    const {
        users,
        loading,
        error
    } = useGetUsers();

    const mailThem = (mail: string) => {
        // malto sopmething I forgot
        alert(mail);
    }

    return (
        <div className="bg-white w-screen min-h-screen overflow-x-hidden shadow-md rounded-md p-4">
            <h1 className="text-xl mb-4">Users</h1>
            <div className="flex flex-col gap-2 overflow-x-hidden">
                {
                    loading ? (
                        <h1>Loading</h1>
                    ) : error ? (
                        <h1>Oops! an error occured, please try again later.</h1>
                    ) : users?.length ? (
                        users.map(user => {
                            return (
                                <div key={user.id} className="w-full p-2 shadow-sm rounded-sm border border-gray-200">
                                    <div className="flex items-center mb-2 justify-between">
                                        <h1>{user.username}</h1>
                                        <h1 className="text-xs text-gray-700">{user.phone}</h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a target="_blank" href={user.website}>
                                            <button className="cursor-pointer text-xs bg-[#1e1e1e] text-white px-4 py-2 rounded-md">Visit Website</button>
                                        </a>
                                        <button onClick={() => mailThem(user.email)} className="cursor-pointer text-xs bg-[#1e1e1e] text-white px-4 py-2 rounded-md">Mail</button>
                                    </div>
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
        </div>
    )
}

export default Users;