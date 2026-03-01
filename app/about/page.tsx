import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jan Overhaus – photographer based in Berlin. Analog and digital images from Landscape, Street and Architecture.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main>
        <section className="page-padding py-10 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start max-w-5xl">
            {/* Portrait */}
            <div className="relative aspect-3/4 overflow-hidden bg-primary/5">
              <Image
                src="/images/self-portrait/self-portrait-01.jpg"
                alt="Jan Overhaus with analog Canon camera"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center gap-8">
              <h1 className="text-h1">Jan Overhaus</h1>

              <div className="flex flex-col gap-4">
                <p className="text-body text-primary/80 leading-relaxed">
                  Some images arrive. They don't ask for permission — they
                  simply appear in a particular quality of light, in the way a
                  shadow falls across a face or a building, in the brief
                  geometry of a stranger's passing.
                </p>
                <p className="text-body text-primary/80 leading-relaxed">
                  My work moves between analog and digital — between the slow
                  deliberateness of film and the immediacy of a sensor. Both
                  matter. Both teach patience in different ways.
                </p>
                <p className="text-body text-primary/80 leading-relaxed">
                  Based in Berlin, I photograph landscapes that hold silence,
                  streets that tell stories without words, and architecture that
                  reveals the ideas frozen inside concrete and glass.
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <p className="text-body-sm text-primary/50">
                  For inquiries:{" "}
                  <a
                    href="mailto:jan.overhaus@icloud.com"
                    className="text-primary hover:opacity-60 transition-opacity underline underline-offset-4"
                  >
                    jan.overhaus@icloud.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
