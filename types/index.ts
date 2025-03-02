import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
// For data in product page
export interface Product {
  id?: string;
  name: string;
  category: string;
  subhead: string;
  imageUrl: string;
  description?: string; // Optional field
}
export interface ProductCardProps {
  data: Product;
}
// For Crousel
export interface SlideData {
  title: string;
  button: string;
  src: string;
}
export interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}
export interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}
export interface CarouselProps {
  slides: SlideData[];
}
// Get data from domin
export interface SiteData {
  name: string;
  description: string;
  domain: string;
}
// to get the pageProps / as params will be passed for better filter
export interface PageProps {
  params: Promise<{ Product: string }>; // params is a Promise now
}
