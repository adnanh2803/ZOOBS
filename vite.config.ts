import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }) => ({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({ fallback: '404.html' }),
			// Project site serves under /ZOOBS on GitHub Pages; keep root in dev
			// so `npm run dev` loop in AGENTS.md keeps working unchanged.
			paths: { base: command === 'serve' ? '' : '/ZOOBS' }
		}),
		// Offline PWA: precache app shell; pages cached on first visit
		// (StaleWhileRevalidate), so the handbook works roadside without internet.
		// Manifest is hand-written in static/ (relative URLs work under any base).
		VitePWA({
			registerType: 'autoUpdate',
			manifest: false,
			devOptions: { enabled: false },
			workbox: {
				globPatterns: ['**/*.{js,css,svg,png,webmanifest,ico}'],
				// Precache the app shell HTML too (written by the adapter, so it can't
				// be globbed): enables offline cold start. revision:null re-fetches it
				// on every SW install, so deploys never serve a stale shell.
				additionalManifestEntries: [{ url: 'index.html', revision: null }],
				// Disable the plugin's auto NavigationRoute (bound to index.html):
				// it would shadow our pages route below and serve the home shell
				// for every navigation instead of the precached/cached page.
				navigateFallbackDenylist: [/.*/],
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'StaleWhileRevalidate',
						options: { cacheName: 'pages' }
					}
				]
			}
		})
	]
}));
