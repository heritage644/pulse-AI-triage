import Navbar from "@/components/navbar";
import Landing from "./Landing";
import { CognitionField } from "@/components/cognitionfiels";
import { TrustBar } from "@/components/trustbar";

export default function Home() {
  return (
    <div className="grain relative min-h-screen w-full overflow-hidden bg-[#05070b] text-slate-100">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 10%, rgba(15,42,66,.55), transparent 60%), radial-gradient(900px 600px at 85% 20%, rgba(6,60,55,.35), transparent 65%), radial-gradient(1000px 800px at 60% 100%, rgba(24,20,55,.35), transparent 70%)",
        }}
      />

      <Navbar />

      <main className="relative z-10 px-6 md:px-10 lg:px-14 pt-8 md:pt-14 pb-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid lg:grid-cols-12 gap-10 items-center min-h-[calc(100vh-8rem)]">
            <div className="lg:col-span-6">
              <Landing />
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <CognitionField />
            </div>
          </div>

          <TrustBar />
        </div>
      </main>
    </div>
  );
}