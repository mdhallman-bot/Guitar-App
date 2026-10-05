'use client';
import {useEffect,useRef,useState} from 'react';
import {Headphones,RotateCcw} from 'lucide-react';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
const KEY='royal-recording-v1';
export function formatTime(value:number){const n=Math.max(0,Math.floor(value));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`}
export default function SongRecording({onStart}:{onStart:()=>void}){
 const audio=useRef<HTMLAudioElement>(null),resume=useRef(0),lastSave=useRef(0);
 const [duration,setDuration]=useState(0),[position,setPosition]=useState(0),[start,setStart]=useState(0),[end,setEnd]=useState(0),[repeat,setRepeat]=useState(false),[rate,setRate]=useState('1'),[error,setError]=useState(''),[ready,setReady]=useState(false);
 useEffect(()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');if(Number.isFinite(d.position)&&d.position>=0)resume.current=d.position;if(Number.isFinite(d.start)&&d.start>=0)setStart(d.start);if(Number.isFinite(d.end)&&d.end>d.start)setEnd(d.end);if(['0.5','0.75','1'].includes(d.rate))setRate(d.rate)}catch{}setReady(true);return()=>audio.current?.pause()},[]);
 function save(pos=audio.current?.currentTime||0){try{localStorage.setItem(KEY,JSON.stringify({position:pos,start,end,rate}))}catch{}}
 useEffect(()=>{if(!ready)return;const player=audio.current;if(player){player.playbackRate=Number(rate);player.preservesPitch=true}save()},[rate,start,end,ready]);
 useEffect(()=>{if(!repeat||end<=start)return;const id=setInterval(()=>{const player=audio.current;if(player&&!player.paused&&(player.currentTime>=end||player.currentTime<start))player.currentTime=start},40);return()=>clearInterval(id)},[repeat,start,end]);
 function loaded(){const player=audio.current;if(!player)return;const d=Number.isFinite(player.duration)?player.duration:0;setDuration(d);setEnd(e=>Math.min(e,d));setStart(s=>Math.min(s,Math.max(0,d-.25)));if(resume.current>0&&resume.current<d)player.currentTime=resume.current;player.playbackRate=Number(rate);player.preservesPitch=true;setPosition(player.currentTime)}
 function update(){const player=audio.current;if(!player)return;setPosition(player.currentTime);if(Date.now()-lastSave.current>2000){save();lastSave.current=Date.now()}}
 function mark(which:'start'|'end'){const current=audio.current?.currentTime||0;setRepeat(false);if(which==='start'){setStart(current);if(end<=current)setEnd(0)}else if(current>start+.25){setEnd(current);setError('')}else setError('Move the playhead past the start before marking the end.')}
 async function playSection(){const player=audio.current;if(!player)return;player.currentTime=start;try{await player.play()}catch{setError('Tap the player’s play button to enable audio.')}}
 return <section className="song-recording" aria-label="Royal recording"><div className="recording-title"><Headphones size={20}/><div><h3>Royal · your recording</h3><p>Bandcamp purchase · {duration?formatTime(duration):'5:56'}</p></div></div>
 <audio ref={audio} controls preload="metadata" src="/audio/royal.mp3" onLoadedMetadata={loaded} onTimeUpdate={update} onPlay={()=>{setError('');onStart();if(repeat&&audio.current&&(audio.current.currentTime<start||audio.current.currentTime>=end))audio.current.currentTime=start}} onPause={()=>save()} onEnded={()=>{if(repeat)playSection();else save(0)}} onError={()=>setError('The recording could not load. Reconnect and refresh, then try again.')} aria-label="Play your Royal recording"/>
 <div className="recording-controls"><div className="recording-speed"><span>Speed</span><Select value={rate} onValueChange={setRate}><SelectTrigger aria-label="Recording playback speed"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="0.5">0.5×</SelectItem><SelectItem value="0.75">0.75×</SelectItem><SelectItem value="1">1×</SelectItem></SelectContent></Select></div><button className="textbtn" onClick={()=>mark('start')} disabled={!duration}>Mark start</button><button className="textbtn" onClick={()=>mark('end')} disabled={!duration}>Mark end</button></div>
 <div className="recording-loop"><span>{formatTime(start)} – {end>start?formatTime(end):'set end'}</span><button className="textbtn" disabled={end<=start} onClick={playSection}>Play section</button><label htmlFor="repeat-royal"><RotateCcw size={14}/> Repeat</label><Switch id="repeat-royal" checked={repeat} disabled={end<=start} onCheckedChange={v=>{setRepeat(v);if(v&&audio.current)audio.current.currentTime=start}}/></div>
 <p className="caption">Seek with the player, then mark the phrase’s start and end. Slower playback keeps the pitch where your browser supports it.</p>{error&&<p role="status" className="recording-error">{error}</p>}</section>
}
