import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Guitar Practice',description:'Your next step on electric guitar. Royal and Hungersite, ear training, theory and practice.',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'Guitar Practice',statusBarStyle:'black-translucent'},icons:{icon:'/favicon.svg',apple:'/apple-touch-icon.png'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#111c28',viewportFit:'cover'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
