import { notFound } from "next/navigation";
import { getMissionById, missionsData } from "@/data/missionsData";
import { MissionRunner } from "@/components/mission/MissionRunner";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return missionsData.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const mission = getMissionById(id);
  if (!mission) return { title: "Mission Not Found" };
  return {
    title: `${mission.badge}: ${mission.title} — Robotics Lab`,
    description: mission.situation,
  };
}

export default async function MissionPage({ params }: Props) {
  const { id } = await params;
  const mission = getMissionById(id);

  if (!mission) {
    notFound();
  }

  return <MissionRunner mission={mission} />;
}
