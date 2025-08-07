import { useEffect, useState } from "react";

interface Job {
    id: number;
    title: string;
    by: string;
    time: number;
    url?: string;
}

export const useJobs = () => {
    const [jobIds, setJobIds] = useState<number[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const LIMIT = 6;

    useEffect(() => {
        fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
            .then(res => res.json())
            .then((data: number[]) => setJobIds(data));
    }, []);

    useEffect(() => {
        if (!jobIds.length) return;
        const loadJobs = async () => {
            setLoading(true);
            const start = (page - 1) * LIMIT;
            const end = start + LIMIT;
            const batch = jobIds.slice(start, end);
            const fetchedJobs = await Promise.all(
                batch.map(id =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
                )
            );
            setJobs(prev => [...prev, ...fetchedJobs]);
            setLoading(false);
        };
        loadJobs();
    }, [page, jobIds]);

    const loadMore = () => setPage(p => p + 1);
    const hasMore = page * LIMIT < jobIds.length;

    return { jobs, loadMore, hasMore, loading };
};