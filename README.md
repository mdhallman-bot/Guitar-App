# Guitar Practice

[Open the private app](https://marks-guitar-practice.markhallman1.chatgpt.site)

React/TypeScript source for sequential Royal and Hungersite practice: saved progress, warmups, ear training, quizzes, metronome, fretboard diagrams and optional AI coach. This is an app project rather than one standalone HTML file.

## Development

Install with pnpm using the committed lockfile. Run pnpm dev or pnpm build. The live app uses Sites and Cloudflare Workers; this repository does not automatically deploy to the live app.

Configure OPENAI_API_KEY and OPENAI_MODEL as server-side secrets to enable the coach. Never commit real API keys. The coach is disabled until configured; its per-isolate request throttle is not a durable spending cap.

## Recording

The player expects public/audio/royal.mp3. The purchased recording is excluded from this public repository; add your own copy locally or use the private app. The player has speed selection and A-B section repetition. Position and loop markers are saved locally.

Original exercises are not verified solo transcriptions. Reference tabs/videos link to their publishers. Progress is device-local; export a backup before clearing website data. Initial online loading is needed for offline lessons; recordings, external references and the coach need internet.
