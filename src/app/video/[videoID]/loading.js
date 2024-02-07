import "/public/assets/css/skeleton.min.css";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <LoadingSkeleton />
}

function LoadingSkeleton() {
    return <>
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    </>;
}