import Faculties from "./Faculties";

// ISR - Revalidate every hour (production cache)
export const revalidate = 3600;

export default async function Page() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    // Fetch with ISR caching
    const res = await fetch(`${baseUrl}/api/faculties`, {
      next: { revalidate: 3600 }, // Cache for 1 hour, then revalidate
      // Request timeout (Vercel: 5s, Self-hosted: 30s)
    });

    if (!res.ok) {
      console.error(`[Faculties] API returned ${res.status}`);
      return <Faculties initialFaculties={[]} />;
    }

    const faculties = await res.json();
    return <Faculties initialFaculties={Array.isArray(faculties) ? faculties : []} />;
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[Faculties] Fetch error:", errorMsg);
    
    // Return empty gracefully - content will still be visible
    return <Faculties initialFaculties={[]} />;
  }
}
