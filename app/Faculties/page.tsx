import Faculties from "./Faculties";


export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/faculties`, {
    cache: "no-store", // always fresh
  });
  const faculties = await res.json();

  return <Faculties initialFaculties={faculties} />;
}
