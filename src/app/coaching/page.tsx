"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { CoachingContent } from "@/components/pages/CoachingContent";
import { AuthGuard } from "@/components/AuthGuard";

export default function CoachingPage() {
  return (
    <AuthGuard>
      <MainLayout>
        <CoachingContent />
      </MainLayout>
    </AuthGuard>
  );
} 