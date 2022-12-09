import { MeiliSearch } from 'meilisearch';

export const meili = new MeiliSearch({
  host: process.env.MEILI_HOST as string,
  apiKey: process.env.MEILI_KEY,
});
