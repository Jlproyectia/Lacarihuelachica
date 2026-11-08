'use client';
import {useRef,useState} from 'react';
import GuestJournal from './guest-journal';
import EditorialCollage from './editorial-collage';
import {AnimatePresence,motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
import {ArrowDown,ArrowUpRight,ArrowLeft,ArrowRight} from 'lucide-react';

const scenes=[{id:41,label:'El salón',en:'The dining room'},{id:60,label:'Nuestra cocina',en:'Our kitchen'},{id:43,label:'La terraza',en:'The terrace'}];
const spaces=[{id:37,label:'El salón',en:'The dining room',caption:'Madera, luz cálida y una mesa preparada para disfrutar.',captionEn:'Warm wood, soft light and a table ready to welcome you.'},{id:38,label:'La terraza',en:'The terrace',caption:'La vida mediterránea, en el paseo de Los Boliches.',captionEn:'Mediterranean life on the Los Boliches promenade.'},{id:39,label:'Los detalles',en:'The details',caption:'Cristalería, manteles blancos y el placer de una larga sobremesa.',captionEn:'Glassware, white linen and the pleasure of a leisurely lunch.'}];
const dishes=[{id:54,name:'Carabineros',kind:'Mariscos',en:'Seafood'},{id:55,name:'Langosta salvaje',kind:'Mariscos',en:'Seafood'},{id:56,name:'Cigalas',kind:'Mariscos',en:'Seafood'},{id:57,name:'Caviar de Río Frío',kind:'Crudos',en:'Raw selection'},{id:59,name:'Atún rojo de almadraba',kind:'Pescados',en:'Fish'},{id:61,name:'Ventresca de atún rojo',kind:'Pescados',en:'Fish'}];
function Photo({id,alt,eager=false}:{id:number;alt:string;eager?:boolean}){const n=String(id).padStart(2,'0');return <img src={`/images/${n}.webp`} srcSet={`/images/${n}-small.webp 640w, /images/${n}.webp 1600w`} sizes="(max-width:767px) 100vw, 70vw" alt={alt} loading={eager?'eager':'lazy'} decoding="async"/>}
export default function HomeEdition({en,onBook}:{en:boolean;onBook:()=>void}){
 const [scene,setScene]=useState(0); const [space,setSpace]=useState(0); const rail=useRef<HTMLDivElement>(null);const theatre=useRef<HTMLElement>(null);const reduce=useReducedMotion();
 const {scrollY}=useScroll();const y=useTransform(scrollY,[0,1000],['0%','18%']);const mastY=useTransform(scrollY,[0,1000],['0%','-20%']);
 const t=(es:string,eng:string)=>en?eng:es;
 return <div className="edition">
  <section className="edition-theatre" ref={theatre} aria-label={t('La Carihuela Chica, restaurante en Los Boliches','La Carihuela Chica, restaurant in Los Boliches')}>
   <motion.div className="edition-scene" style={{y:reduce?0:y}}><AnimatePresence initial={false} mode="sync"><motion.div key={scene} className="scene-image" initial={reduce?false:{opacity:0,scale:1.06}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:1.1,ease:[.22,1,.36,1]}}><Photo id={scenes[scene].id} alt={en?scenes[scene].en:scenes[scene].label} eager/></motion.div></AnimatePresence></motion.div>
   <div className="edition-vignette"/>
   <span className="theatre-location">36°33′ N · 4°36′ W<br/>LOS BOLICHES, FUENGIROLA</span>
   <motion.div className="edition-masthead" style={{y:reduce?0:mastY}} initial={reduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:1.1}}><span className="masthead-small">RESTAURANTE & MARISQUERÍA</span><h1><span>La Carihuela</span><em>Chica</em></h1></motion.div>
   <div className="edition-bottom"><p>{t('El Mediterráneo.','The Mediterranean.')}<br/>{t('Y todo el tiempo del mundo.','And all the time in the world.')}</p><div className="scene-tabs" aria-label={t('Fotografías de portada','Cover photographs')}>{scenes.map((s,i)=><button key={s.id} aria-pressed={scene===i} onClick={()=>setScene(i)}><span>0{i+1}</span><span>{en?s.en:s.label}</span><i/></button>)}</div></div>
   <a href="#la-casa" className="edition-scroll" aria-label={t('Explorar la nueva portada','Explore the new home page')}><ArrowDown size={17} strokeWidth={1}/></a>
  </section>
  <section id="la-casa" className="edition-manifesto">
   <div className="manifesto-note"><span>LA CARIHUELA CHICA</span><span>{t('Una casa mediterránea.','A Mediterranean home.')}</span></div>
   <motion.h2 initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}}>{t('El mar nos trae','The sea brings us')}<br/>{t('lo mejor.','its finest.')}<br/><em>{t('La mesa nos reúne.','The table brings us together.')}</em></motion.h2>
   <p>{t('Pescado de lonja, mariscos y arroces. Una cocina que nace del producto y se disfruta frente a la playa de Los Boliches.','Fresh fish, seafood and rice dishes. Ingredient-led cooking, enjoyed beside Los Boliches beach.')}</p>
   <a className="edition-link" href="/experiencia">{t('Esta es nuestra casa','This is our home')}<ArrowUpRight size={18}/></a>
  </section>
  <section className="product-study" aria-label={t('Una selección de nuestros mariscos','A selection of our seafood')}>
   {[{id:58,name:'Ostras francesas',en:'French oysters'},{id:63,name:'Vieiras gratinadas',en:'Scallops au gratin'},{id:64,name:'Zamburiñas',en:'Small scallops'}].map(d=><a href="/carta#galeria" className="product-study-item" key={d.id}><div><Photo id={d.id} alt={en?d.en:d.name}/></div><h3>{en?d.en:d.name}</h3><span>{t('Mariscos · La carta','Seafood · The menu')}<ArrowUpRight size={15}/></span></a>)}
  </section>
  <section className="edition-selection" aria-labelledby="selection-title">
   <div className="selection-top"><span>01 — {t('LA COCINA','THE KITCHEN')}</span><h2 id="selection-title">{t('Puro','Pure')} <em>{t('producto.','flavour.')}</em></h2><div className="rail-controls"><button aria-label={t('Platos anteriores','Previous dishes')} onClick={()=>rail.current?.scrollBy({left:-600,behavior:reduce?'instant':'smooth'})}><ArrowLeft size={20}/></button><button aria-label={t('Siguientes platos','Next dishes')} onClick={()=>rail.current?.scrollBy({left:600,behavior:reduce?'instant':'smooth'})}><ArrowRight size={20}/></button></div></div>
   <div className="edition-rail" ref={rail}>{dishes.map((dish,i)=><a href="/carta#galeria" className={`edition-dish dish-position-${i%3}`} key={dish.id}><div className="edition-dish-photo"><Photo id={dish.id} alt={dish.name}/><span className="dish-view"><ArrowUpRight size={25} strokeWidth={1}/></span></div><div className="dish-edition-caption"><span>0{i+1}</span><div><h3>{dish.name}</h3><p>{en?dish.en:dish.kind}</p></div></div></a>)}</div>
   <div className="selection-bottom"><span>{t('De la lonja, de la tierra, de nuestra cocina.','From the sea, the land and our kitchen.')}</span><a className="edition-link" href="/carta">{t('Explorar toda la carta','Explore the full menu')}<ArrowUpRight size={18}/></a></div>
  </section>
  <section id="nuestros-espacios" className="house-gallery" aria-labelledby="house-title">
   <header className="house-heading"><span>02 / {t('EL RESTAURANTE','THE RESTAURANT')}</span><h2 id="house-title">{t('El arte de','The art of')} <em>{t('estar a gusto.','feeling at home.')}</em></h2><p>{t('Un lugar para compartir la mesa y dejar que la conversación continúe.','A place to share a table and let the conversation continue.')}</p></header>
   <div className="house-selector" aria-label={t('Seleccionar espacio','Select a space')}>{spaces.map((item,i)=><button key={item.id} aria-pressed={space===i} onClick={()=>setSpace(i)}><span>0{i+1}</span>{en?item.en:item.label}</button>)}</div>
   <figure className="house-frame"><div className="house-photograph"><AnimatePresence initial={false}><motion.div className="house-image" key={space} initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.6}}><Photo id={spaces[space].id} alt={t('Recreación del espacio: ','Recreated space: ')+(en?spaces[space].en:spaces[space].label)}/></motion.div></AnimatePresence></div><figcaption><div><span className="house-index">0{space+1} / 03</span><p aria-live="polite">{en?spaces[space].captionEn:spaces[space].caption}</p></div><a className="edition-link" href="/experiencia">{t('Conocer la casa','Discover the restaurant')}<ArrowUpRight size={17}/></a></figcaption></figure>
  </section>
  <EditorialCollage en={en} photos={[{id:62,name:'Parrillada especial de mariscos',en:'Seafood from the grill'},{id:86,name:'Buey de mar',en:'Brown crab'},{id:66,name:'Carpaccio de ventresca',en:'Tuna belly carpaccio'},{id:87,name:'Almejas',en:'Clams'},{id:65,name:'Navajas gallegas',en:'Galician razor clams'},{id:88,name:'Coquinas',en:'Coquina clams'},{id:89,name:'Atún rojo',en:'Bluefin tuna'}]}/>
  <GuestJournal en={en}/>
  <section className="reservation-finale" id="reservar"><div className="finale-rule"><span>LA CARIHUELA CHICA</span><span>LOS BOLICHES · FUENGIROLA</span></div><div className="finale-content"><span>{t('EL PRÓXIMO ENCUENTRO','YOUR NEXT OCCASION')}</span><h2>{t('Lo mejor se comparte','The finest things are shared')}<br/><em>{t('alrededor de una mesa.','around a table.')}</em></h2><button onClick={onBook}>{t('Elegir mi mesa','Find my table')}<ArrowUpRight size={22}/></button><p>{t('Reservas en modo demostración','Reservation preview · No booking will be sent')}</p></div><div className="finale-photograph"><Photo id={45} alt={t('Recreación de la terraza al anochecer','Recreated terrace at dusk')}/></div></section>
 </div>
}

