"use client";
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import ContainerCup from '@/types/containercup';
import { ContainerCupAPIService } from '@/utils/containerCupAPIService';

export default function Dashboard() {
  const [cups, setCups] = useState<ContainerCup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUser()?.id || "";

  useEffect(() => {
    if (userId) {
      ContainerCupAPIService.getContainerCups(userId).then(cups => setCups(cups)).finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p>Dashboard works!</p>
      <ul>
        {cups.map(cup => (
          <li key={cup.id}>{cup.name}</li>
        ))}
      </ul>
    </>
  );
}
