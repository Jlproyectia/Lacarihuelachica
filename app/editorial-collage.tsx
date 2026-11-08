'use client';
import {useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import {ArrowLeft,ArrowRight,ArrowUpRight,X} from 'lucide-react';
export type CollagePhoto={id:number;name:string;en:string;group?:string};
export default function EditorialCollage({photos,en=false,venue=false}:{photos:CollagePhoto[];en?:boolean;venue?:boolean}){
 const [filter,setFilter]=useState('all'),[active,setActive]=useState(0);const dialog=useRef<HTMLDialogElement>(null);const reduce=useReducedMotion();
 const visible=filter==='all'?photos:photos.filter(p=>p.group===filter);const current=visible[active]||visible[0];
 const src=(id:number)=>`/images/${String(id).padStart(2,'0')}.webp`;
 function close(){dialog.current?.close()}
 function move(n:number){setActive(i=>(i+n+visible.length)%visible.length)}
 return <section className={`editorial-collage ${venue?'collage-venue':'collage-food'}`}>
  <header className="collage-heading"><div><span>{venue?(en?'A WALK THROUGH OUR HOME':'UN PASEO POR NUESTRA CASA'):(en?'THE MEDITERRANEAN COLLECTION':'LA COLECCIÓN MEDITERRÁNEA')}</span><h2>{venue?(en?'Stay a little longer.':'Quédate un poco más.'):(en?'A taste of the sea.':'El mar, en todos sus matices.')}</h2></div><p>{en?'Explore the photographs. Take your time.':'Explora las fotografías. Tómate tu tiempo.'}</p></header>
  {venue&&<div className="collage-filters" aria-label={en?'Choose a space':'Elige un espacio'}>{[['all','Todos los espacios','All spaces'],['salon','El salón','Dining room'],['terraza','La terraza','Terrace']].map(([id,es,eng])=><button key={id} aria-pressed={filter===id} onClick={()=>{setFilter(id);setActive(0)}}>{en?eng:es}</button>)}</div>}
  <motion.div layout={!reduce} className="collage-grid"><AnimatePresence mode="popLayout">{visible.map((p,i)=><motion.figure layout={!reduce} key={p.id} className={`collage-piece piece-${i%7}`} initial={reduce?false:{opacity:0,y:45,clipPath:'inset(8% 0 0 0)'}} whileInView={{opacity:1,y:0,clipPath:'inset(0% 0 0 0)'}} exit={{opacity:0,scale:.96}} viewport={{once:true,amount:.12}} transition={{duration:reduce?0:.75,delay:reduce?0:(i%3)*.08,ease:[.22,1,.36,1]}}><button onClick={()=>{setActive(i);dialog.current?.showModal()}} aria-label={`${en?'Enlarge':'Ampliar'}: ${en?p.en:p.name}`}><img src={src(p.id)} alt={en?p.en:p.name} loading="lazy" decoding="async"/><span className="collage-expand"><ArrowUpRight size={22}/></span></button><figcaption><span>{String(i+1).padStart(2,'0')}</span>{en?p.en:p.name}</figcaption></motion.figure>)}</AnimatePresence></motion.div>
  <dialog ref={dialog} className="collage-dialog" aria-label={en?'Photo gallery':'Galería de fotografías'} onClick={e=>{if(e.target===dialog.current)close()}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}>
   <button className="collage-close" onClick={close} aria-label={en?'Close gallery':'Cerrar galería'}><X/></button><AnimatePresence mode="wait"><motion.img key={current.id} src={src(current.id)} alt={en?current.en:current.name} initial={{opacity:reduce?1:0}} animate={{opacity:1}} exit={{opacity:reduce?1:0}} transition={{duration:.2}}/></AnimatePresence><div className="collage-viewer-footer"><button onClick={()=>move(-1)} aria-label={en?'Previous photo':'Foto anterior'}><ArrowLeft/></button><div><span>{en?current.en:current.name}</span><small>{String(active+1).padStart(2,'0')} / {String(visible.length).padStart(2,'0')}</small></div><button onClick={()=>move(1)} aria-label={en?'Next photo':'Siguiente foto'}><ArrowRight/></button></div>
  </dialog>
 </section>
}
