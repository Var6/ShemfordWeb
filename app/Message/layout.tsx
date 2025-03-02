export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center  md:pb-10">
      <div className="inline-block w-full h-full text-center justify-center">
        {children}
      </div>
    </section>
  );
}
