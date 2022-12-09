import PostgresFilter from '@/components/postgresFilter';
import PostgresList from '@/components/postgresList';

export default async function PostgresPage() {
  return (
    <div className="mx-auto max-w-4xl pt-6 pb-12 px-4">
      <h1 className="font-serif text-3xl mb-4">Postgres</h1>

      <PostgresFilter />

      <PostgresList />
    </div>
  );
}
