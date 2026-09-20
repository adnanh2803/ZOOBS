import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

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
		})
	]
}));
