import { useJobs } from "./useJobs";

const formatTime = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.toLocaleString();
};

const JobBoard = () => {
    const { jobs, loadMore, hasMore, loading } = useJobs();

    return (
        <div className="min-h-screen w-screen bg-gray-100 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Hacker News Job Board</h1>
                <div className="flex flex-col gap-4">
                    {jobs.map(job => (
                        <div key={Math.random()} className="bg-white shadow-md rounded-md p-4">
                            <h2 className="text-lg font-semibold text-blue-600">
                                {job.url ? (
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {job.title}
                                    </a>
                                ) : (
                                    job.title
                                )}
                            </h2>
                            <p className="text-sm text-gray-700">Posted by: {job.by}</p>
                            <p className="text-sm text-gray-500">Posted: {formatTime(job.time)}</p>
                        </div>
                    ))}
                </div>
                {hasMore && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={loadMore}
                            className="px-6 py-2 bg-[#1e1e1e] text-white rounded-md shadow hover:bg-black transition"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobBoard;