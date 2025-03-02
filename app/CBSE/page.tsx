import Mycard from '@/components/card';
import { title } from '@/components/primitives';

export default function CBSE() {
  return (
    <div>
      <h1 className={title()}>CBSE</h1>
      <div className='flex flex-row'> 

      <Mycard Text='Mandatory Disclosure' link='/CBSE/Disclouser' image='CBSE.png' className='pb-5'/>
      <Mycard Text='School Information' link='/CBSE/Information' image='images1.png'/>
      <Mycard Text='Pedagogical Information' link='/CBSE/Pedagogical' image='images1.png'/>
      </div>
    </div>
  );
}
