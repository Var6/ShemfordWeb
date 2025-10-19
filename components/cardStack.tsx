'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.08;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        /* OUTER wrapper: acts as the gradient border */
        <motion.div
          key={card.id}
          className="
            absolute
            p-[3px]               /* border thickness */
            rounded-3xl
            bg-gradient-to-r from-yellow-500 to-orange-700
            /* keep a subtle outer shadow so it isn't clipped */
            shadow-3xl shadow-black/[0.06] dark:shadow-white/[0.03]
            /* allow child to size itself (inner sets the card size) */
            flex
          "
          style={{
            transformOrigin: 'top center',
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
        >
          {/* INNER card: actual content area (same radius so gradient shows as border) */}
          <div
            className="
              h-60 w-60 md:h-60 md:w-96
              bg-white dark:bg-orange-400
              rounded-3xl
              p-4
              flex flex-col justify-between
              /* inner shadow if you want more depth;
                 note: if you add overflow-hidden on the outer wrapper it may clip this  */
              shadow-black/[0.1] dark:shadow-white/[0.05]
            "
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
