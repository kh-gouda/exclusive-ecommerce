import SectionTitle from "@ui/shared/SectionTitle";

export default function AboutMain() {
  return (
    <main className="flex *:flex-1 min-h-176.25 gap-25 pt-20 pb-35">
      <div className="flex items-center justify-end">
        <div className="max-w-131.25">
          <SectionTitle size="54px" weight={500}>
            Our Story
          </SectionTitle>
          <p className="mt-10 mb-6">
            Launced in 2015, Exclusive is South Asia&apos;s premier online
            shopping makterplace with an active presense in Bangladesh.
            Supported by wide range of tailored marketing, data and service
            solutions, Exclusive has 10,500 sallers and 300 brands and serves 3
            millioons customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
      </div>
      <div className="bg-about-area rounded-l-sm"></div>
    </main>
  );
}
