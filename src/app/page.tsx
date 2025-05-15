"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { ContentRouter } from "@/components/ContentRouter";
import { AuthGuard } from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <MainLayout>
        <ContentRouter />
      </MainLayout>
    </AuthGuard>
  );
}
