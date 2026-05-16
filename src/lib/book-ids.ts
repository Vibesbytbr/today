const BOOK_NAME_TO_OSIS: Record<string, string> = {
  genesis: "GEN",
  exodus: "EXO",
  leviticus: "LEV",
  numbers: "NUM",
  deuteronomy: "DEU",
  joshua: "JOS",
  judges: "JDG",
  ruth: "RUT",
  "1 samuel": "1SA",
  "2 samuel": "2SA",
  "1 kings": "1KI",
  "2 kings": "2KI",
  "1 chronicles": "1CH",
  "2 chronicles": "2CH",
  ezra: "EZR",
  nehemiah: "NEH",
  esther: "EST",
  job: "JOB",
  psalm: "PSA",
  psalms: "PSA",
  proverbs: "PRO",
  ecclesiastes: "ECC",
  "song of solomon": "SNG",
  song: "SNG",
  isaiah: "ISA",
  jeremiah: "JER",
  lamentations: "LAM",
  ezekiel: "EZK",
  daniel: "DAN",
  hosea: "HOS",
  joel: "JOL",
  amos: "AMO",
  obadiah: "OBA",
  jonah: "JON",
  micah: "MIC",
  nahum: "NAM",
  habakkuk: "HAB",
  zephaniah: "ZEP",
  haggai: "HAG",
  zechariah: "ZEC",
  malachi: "MAL",
  matthew: "MAT",
  mark: "MRK",
  luke: "LUK",
  john: "JHN",
  acts: "ACT",
  romans: "ROM",
  "1 corinthians": "1CO",
  "2 corinthians": "2CO",
  galatians: "GAL",
  ephesians: "EPH",
  philippians: "PHP",
  colossians: "COL",
  "1 thessalonians": "1TH",
  "2 thessalonians": "2TH",
  "1 timothy": "1TI",
  "2 timothy": "2TI",
  titus: "TIT",
  philemon: "PHM",
  hebrews: "HEB",
  james: "JAS",
  "1 peter": "1PE",
  "2 peter": "2PE",
  "1 john": "1JN",
  "2 john": "2JN",
  "3 john": "3JN",
  jude: "JUD",
  revelation: "REV",
};

const TRANSLATIONS = [
  { id: "BSB", name: "Berean Standard Bible" },
  { id: "ENGKJV", name: "King James Version" },
  { id: "ENGWEBP", name: "World English Bible" },
  { id: "ENGASV", name: "American Standard Version" },
  { id: "ENGNET", name: "NET Bible" },
  { id: "ENGBBE", name: "Bible in Basic English" },
  { id: "ENGYLT", name: "Young's Literal Translation" },
  { id: "ENGGNV", name: "Geneva Bible 1599" },
] as const;

export type TranslationId = (typeof TRANSLATIONS)[number]["id"];

export function getOsisBookId(bookName: string): string | null {
  const key = bookName.toLowerCase().trim();
  return BOOK_NAME_TO_OSIS[key] ?? null;
}

export function getTranslations() {
  return TRANSLATIONS;
}

export function getBibleChapterUrl(
  translation: TranslationId,
  bookId: string,
  chapter: number
): string {
  return `https://bible.helloao.org/api/${translation}/${bookId}/${chapter}.json`;
}

export interface BibleChapter {
  data: {
    id: string;
    bibleId: string;
    bookId: string;
    chapterId: string;
    reference: string;
    content: string;
    verses: Array<{
      id: string;
      orgId: string;
      reference: string;
      text: string;
    }>;
  };
}
