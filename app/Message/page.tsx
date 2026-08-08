'use client';

import { Tabs } from '@/components/tabs';
import Image from 'next/image';

import { usePageContent } from '@/lib/content/client';

interface MessageTab {
  title: string;
  heading: string;
  body: string;
  bullets: string;
  emphasis: string;
  image: string;
  layout: string;
}

/* Each tab keeps its own gradient so the page reads the same as before, and
   extra tabs added by an admin cycle back through the palette. */
const GRADIENTS = [
  'from-orange-700 to-yellow-100',
  'from-orange-700 to-amber-400',
  'from-orange-600 to-amber-400',
  'from-orange-700 to-amber-400',
];

function lines(value: string) {
  return (value ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function TabPanel({ tab, gradient }: { tab: MessageTab; gradient: string }) {
  const paragraphs = lines(tab.body);
  const bullets = lines(tab.bullets);
  const stacked = tab.layout === 'stacked';

  const text = (
    <div className="flex flex-col gap-4 w-full">
      {paragraphs.map((p, i) => (
        <p key={i} className="leading-relaxed">
          {p}
        </p>
      ))}
      {bullets.length > 0 && (
        <ul className="space-y-2 px-4 md:px-10 list-disc">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {tab.emphasis && <p className="font-bold leading-relaxed">{tab.emphasis}</p>}
    </div>
  );

  const photo = tab.image ? (
    <Image
      alt={tab.heading || tab.title}
      className="rounded-xl h-fit mx-auto object-cover"
      height={500}
      src={tab.image}
      width={500}
    />
  ) : null;

  return (
    <div
      className={`flex flex-col w-full items-center justify-between gap-5 overflow-hidden relative
        rounded-2xl p-6 md:p-10 text-white bg-gradient-to-tr ${gradient} text-justify shadow-xl`}
    >
      <span className="text-3xl text-primary text-center">{tab.heading}</span>
      {stacked ? (
        <div className="flex flex-col w-full gap-5 text-lg">
          {text}
          {photo && <div className="flex justify-center">{photo}</div>}
        </div>
      ) : (
        <div className="flex flex-col w-full md:flex-row items-center justify-between gap-5">
          {text}
          {photo}
        </div>
      )}
    </div>
  );
}

export default function Message() {
  const { list } = usePageContent('message');
  const tabsContent = list<MessageTab>('tabs');

  const tabs = tabsContent.map((tab, i) => ({
    title: tab.title,
    value: tab.title || `tab-${i}`,
    content: <TabPanel gradient={GRADIENTS[i % GRADIENTS.length]} tab={tab} />,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="h-full md:h-[40rem] [perspective:1000px] relative flex flex-col w-full items-start justify-start mb-40">
          {tabs.length > 0 && <Tabs tabs={tabs} />}
        </div>
      </div>
    </div>
  );
}
