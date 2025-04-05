import { ThemeDemo } from '@/components/ThemeDemo';
import TypographyDemo from '@/components/TypographyDemo';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 font-inter">
      <h1 className="text-4xl font-bold mb-8 text-content-primary text-center">
        Semantic Design System
      </h1>

      <div className="mb-12">
        <TypographyDemo />
      </div>

      <ThemeDemo />
    </div>
  );
}
