import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/ui/Overlay";
import Loader from "@/components/ui/Loader";

export default function Home() {
  return (
    <main className="relative w-full h-full">
      <Loader />
      <Scene />
      <Overlay />
    </main>
  );
}
