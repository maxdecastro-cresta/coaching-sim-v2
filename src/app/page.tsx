"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { ContentRouter } from "@/components/ContentRouter";

export default function Home() {
  return (
    <MainLayout>
      <ContentRouter />
    </MainLayout>
  );
}
