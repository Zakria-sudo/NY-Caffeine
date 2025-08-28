"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RewardsDialog } from "@/components/dialogShadcn/RewardsDialog";
import RewardsCard from "@/components/card/RewardsCard";
import api from "@/utils/axios";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await api.get("/reward");
        const data = Array.isArray(res.data?.rewards) ? res.data.rewards : [];
        setRewards(data);
      } catch (e) {
        setErr(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="m-3 rounded-2xl bg-white p-4 sm:m-4 sm:p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="font-medium text-[18px]">Rewards</h1>
        <RewardsDialog />
      </div>

      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

      {loading ? (
         <div className="my-7 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <SkeletonRewards className="h-28 w-full rounded-lg mb-4" />
              <SkeletonRewards className="h-5 w-3/4 mb-2" />
              <SkeletonRewards className="h-4 w-1/2 mb-2" />
              <SkeletonRewards className="h-6 w-20" />
            </div>
          ))}
        </div>
      ) : rewards.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No rewards found.</p>
      ) : (
        <div className="my-7 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rewards.map((r) => (
            <RewardsCard
              key={r._id}
              src={'/donuts.png'}                 
              title={r.headline}            
              desc={r.description}          
              points={r.allocatePoints}     
            />
          ))}
        </div>
      )}
    </div>
  );
}


function SkeletonRewards() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white my-5 p-4 shadow-sm">
      <Skeleton className="h-28 w-full rounded-lg mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}