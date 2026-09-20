export interface Violation {
	id: string;
	naziv: string;
	kategorija: string;
	keywords: string[];
	clan_norme: string;
	citat_norme: string;
	clan_sankcije: string;
	citat_sankcije: string;
	kazna_min: number;
	kazna_max: number;
	bodovi: string;
	zabrana: string;
	zatvor: string;
	opis: string;
	source_md: string;
	status: 'potvrdjeno' | 'nacrt';
	/** Glasnik amendment that last changed this entry, e.g. "35/2026". Absent = Nov-2024 text. */
	izmjena?: string;
	/** Related ZOBS articles shown as tappable chips (each verified in source MD). */
	povezano?: string[];
	/** Fine-relevant numeric bracket, e.g. alcohol 0.8-1.5 promiles or 20-30 km/h over. */
	opseg_min?: number;
	opseg_max?: number | null;
	opseg_jedinica?: 'promil' | 'kmh';
	/** Ordered roadside procedure reminder; every step cites a verified ZOBS article. */
	postupanje?: string[];
}

export const KATEGORIJE = [
	'Brzina',
	'Alkohol',
	'Obijesna vožnja',
	'Dokumenti i registracija',
	'Signalizacija i parkiranje',
	'Pojas, kaciga i mobilni'
] as const;
