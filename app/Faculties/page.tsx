import Faculties from "./Faculties";

export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  try {
    const res = await fetch(`${baseUrl}/api/faculties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const faculties = await res.json();
    return <Faculties initialFaculties={faculties} />;
  } catch (error) {
    console.error("Failed to fetch faculties:", error);
    return <Faculties initialFaculties={[]} />;
  }
}
