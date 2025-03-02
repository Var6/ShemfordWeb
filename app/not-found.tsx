import Link from 'next/link';
import { headers } from 'next/headers';
import { SiteData } from '@/types';
import Image from 'next/image';
async function getSiteData(domain: string): Promise<SiteData> {
  // Simulating an API call to fetch site data
  return {
    name: 'Shemford Futuristic School Patna',
    description: 'A fantastic site built with Next.js by Rishabh Ranjan',
    domain: domain,
  };
}

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get('host') || '';
  const data = await getSiteData(domain);
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Image
            src="/icon.png"
            alt="School Logo"
            width={180}
            height={150}
            className="mx-auto"
          />
          <h1 className="text-5xl font-bold mb-4">Wait, What??</h1>
          <h2 className="text-2xl font-bold mb-8">
            You&apos;re searching for{' '}
            <span className="text-danger">Something you shouldn&apos;t </span>?
            Eeuuu...
          </h2>
          <p className="text-lg mb-8">
            That page doesn&apos;t exist, but don&apos;t worry, we&apos;ve got
            you covered!
          </p>
          <Link
            href="/"
            className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Click me and I&apos; send you back to Home Page!
          </Link>
        </div>
      </div>
    </div>
  );
}
