"use client"

import { useParams } from 'next/navigation';

export default function Video() {
    const params      = useParams();
    console.log(params);
    const { videoID } = useParams();
    return (
      <>
        {videoID}
      </>
    )
}

