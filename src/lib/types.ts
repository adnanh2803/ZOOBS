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
}

export const KATEGORIJE = [
	'Brzina',
	'Alkohol',
	'Dokumenti i registracija',
	'Signalizacija i parkiranje',
	'Pojas, kaciga i mobilni'
] as const;
