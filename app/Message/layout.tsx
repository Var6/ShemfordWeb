import CustomNav from "@/components/CustomNav";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      {/* Ensure CustomNav takes full width */}
      <div className="w-full mt-4">
        <CustomNav className="w-full" Page="Message" />
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center mt-5 md:pb-10">
        <div className="inline-block w-full h-full text-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
}
