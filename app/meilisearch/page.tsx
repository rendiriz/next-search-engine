import MeilisearchFilter from '@/components/meilisearchFilter';
import MeilisearchList from '@/components/meilisearchList';

export default async function MeilisearchPage() {
  return (
    <div className="mx-auto max-w-4xl pt-6 pb-12 px-4">
      <h1 className="font-serif text-3xl mb-4">Meilisearch</h1>

      <MeilisearchFilter />

      <MeilisearchList />
    </div>
  );
}
