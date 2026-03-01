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
        <section className="page-padding py-10">
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* Portrait */}
            <div className="w-full md:w-auto md:shrink-0 bg-primary/5">
              <Image
                src="/images/self-portrait/self-portrait-01.jpg"
                alt="Jan Overhaus with analog Canon camera"
                sizes="(max-width: 768px) 100vw, 50vw"
                width={400}
                height={600}
                className="w-full md:w-auto h-auto object-contain object-left"
                priority
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-10 max-w-prose">
              <h1 className="text-h2 uppercase">About</h1>

              <div className="flex flex-col gap-4">
                <p className="text-body text-primary leading-relaxed">
                  My photography is driven by an attention to what is often
                  overlooked: the way light carves through shadow, the geometry
                  hidden in a façade, the pattern that reveals itself when you
                  slow down long enough to see it. Whether on the streets of a
                  European city or in a quiet corner of everyday life, I am
                  drawn to moments of fleeting beauty — brief, fragile, and
                  entirely unrepeatable.
                </p>
                <p className="text-body text-primary leading-relaxed">
                  I work across both analog film and digital, each medium
                  demanding its own kind of seeing. For my black-and-white work,
                  I develop negatives and make prints by hand in the darkroom —
                  a slow, deliberate process I consider inseparable from the
                  images it produces. In an age of immediacy, I find meaning in
                  craft, in patience, and in the belief that a photograph should
                  be made, not just taken.
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <p className="text-body-sm text-primary/50">
                  For inquiries:{" "}
                  <a
                    href="mailto:jan.overhaus@icloud.com"
                    className="text-primary underline underline-offset-4"
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
