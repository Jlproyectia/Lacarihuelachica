import type { Metadata } from 'next';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import './globals.css';
import './luxury-refinement.css';
export const metadata: Metadata = {title:'La Carihuela Chica | El Mediterráneo, a tu mesa',description:'Pescados, mariscos y arroces frente al mar en Los Boliches, Fuengirola. Descubre la carta de La Carihuela Chica.',robots:{index:false,follow:false},icons:{icon:'/images/logo.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}

import './editorial-collage.css';

import './design-system.css';

import './venue-sliders.css';
