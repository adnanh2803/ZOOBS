<script lang="ts">
	import { base } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';

	type Veza = { label: string; href: string };
	type Izmjena = { naslov: string; opis: string; veze: Veza[] };

	const izmjene: Izmjena[] = [
		{
			naslov: 'Obijesna vožnja — novi član 42a i kazna 234b',
			opis: '2.000–3.000 KM, zabrana 6 mj., 2 boda. Uz nezgodu 3.000–5.000 KM, zabrana 9 mj., 4 boda. Povrat u 2 godine → privremeno oduzimanje vozila na licu mjesta.',
			veze: [{ label: 'Obijesna vožnja', href: `${base}/prekrsaj/obijesna-voznja` }]
		},
		{
			naslov: 'Mobitel, antiradar, pojas — novi član 235a',
			opis: 'Kazna podignuta sa 100–300 KM na 200–400 KM. Uz nezgodu: 400–2.000 KM + zabrana 1–6 mj. + 2 boda.',
			veze: [
				{ label: 'Mobilni telefon', href: `${base}/prekrsaj/mobilni` },
				{ label: 'Antiradar', href: `${base}/prekrsaj/antiradar` },
				{ label: 'Pojas', href: `${base}/prekrsaj/pojas` }
			]
		},
		{
			naslov: 'Odbijanje testiranja — obavezan maksimum',
			opis: 'Fiksno 1.000 KM (čl. 234a st. 5) + zadržavanje do 12 h uz znakove poremećenosti (čl. 224 st. 2).',
			veze: [{ label: 'Odbijanje alkotestiranja', href: `${base}/prekrsaj/odbijanje-alkotest` }]
		},
		{
			naslov: 'Trajno oduzimanje vozila — čl. 234a st. 4',
			opis: 'Moguće uz kaznu za vožnju bez prava, neregistrovano vozilo, tuđe tablice, odbijanje testiranja i čl. 227 — ako su ispunjeni uslovi iz čl. 42a.',
			veze: [
				{ label: 'Bez dozvole', href: `${base}/prekrsaj/bez-dozvole` },
				{ label: 'Neregistrovano vozilo', href: `${base}/prekrsaj/neregistrovano` },
				{ label: 'Tuđe tablice', href: `${base}/prekrsaj/pogresne-tablice` }
			]
		},
		{
			naslov: 'Zadržavanje do 12 sati — čl. 224 st. 2',
			opis: 'Vozač sa preko 1,5 g/kg ili koji odbije testiranje, uz znakove poremećenosti, zadržava se do prestanka djelovanja, najduže 12 h.',
			veze: [
				{ label: 'Alkohol preko 1,5', href: `${base}/prekrsaj/alkohol-15-plus` },
				{ label: 'Odbijanje alkotestiranja', href: `${base}/prekrsaj/odbijanje-alkotest` }
			]
		},
		{
			naslov: 'Nove definicije — čl. 9',
			opis: 'Naselje (32), ometanje saobraćaja (36c), učesnik (76), učesnik u nezgodi (76a), ugrožavanje saobraćaja (76b). Bez promjene kazni.',
			veze: []
		}
	];
</script>

<div class="space-y-4">
	<div>
		<h1 class="text-2xl font-bold tracking-tight">Šta je promijenjeno?</h1>
		<p class="mt-1 text-sm text-muted-foreground">
			Važeća verzija: <strong>35/2026</strong> — Službeni glasnik BiH od 19.5.2026, na snazi od
			27.5.2026.
		</p>
	</div>

	<Card.Root>
		<Card.Content class="space-y-1 p-4 text-sm">
			<p>
				<strong>Izvor izmjena:</strong>
				<a
					class="text-primary underline"
					href="https://mup.ks.gov.ba/node/258495"
					target="_blank"
					rel="noreferrer">MUP Kantona Sarajevo — propisi (35/26)</a
				>
			</p>
			<p>
				<strong>Prečišćeni tekst:</strong>
				<a
					class="text-primary underline"
					href="https://www.parlament.ba/law/LawDetails?lawId=1218"
					target="_blank"
					rel="noreferrer">Parlamentarna skupština BiH, lawId=1218</a
				>
				(od novembra 2024; ne sadrži izmjene 35/26).
			</p>
		</Card.Content>
	</Card.Root>

	<ul class="grid gap-3">
		{#each izmjene as z}
			<li>
				<Card.Root>
					<Card.Content class="p-4">
						<div class="flex items-center gap-2">
							<Badge variant="secondary">35/2026</Badge>
							<h2 class="font-semibold">{z.naslov}</h2>
						</div>
						<p class="mt-2 text-sm text-muted-foreground">{z.opis}</p>
						{#if z.veze.length}
							<div class="mt-3 flex flex-wrap gap-2">
								{#each z.veze as v}
									<a href={v.href}>
										<Badge variant="outline" class="h-9 px-3 text-sm">{v.label} →</Badge>
									</a>
								{/each}
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</li>
		{/each}
	</ul>
</div>
