import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/ui/Footer";
import { blurData } from "@/lib/blur-data.generated";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/config";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        en: `${siteUrl}/en/about`,
        de: `${siteUrl}/de/about`,
        "x-default": `${siteUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <Navigation locale={locale} dict={dict} activeHref={`/${locale}/about`} />

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
                placeholder="blur"
                blurDataURL={
                  blurData["/images/self-portrait/self-portrait-01.jpg"]
                }
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-10 max-w-prose">
              <h1 className="text-h2 uppercase">{dict.about.title}</h1>

              <div className="flex flex-col gap-4">
                <p className="text-body text-primary leading-relaxed">
                  {dict.about.para1}
                </p>
                <p className="text-body text-primary leading-relaxed">
                  {dict.about.para2}
                </p>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <p className="text-body-sm text-primary/60">
                  {dict.about.contactText}{" "}
                  <a
                    href="mailto:info@janoverhaus.com"
                    className="text-primary underline underline-offset-4"
                  >
                    info@janoverhaus.com
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
