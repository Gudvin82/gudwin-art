import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-5xl">404</h1>
      <p className="mt-3 text-muted-foreground">Страница не найдена.</p>
      <Link to="/" className="mt-6 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-black">
        На главную
      </Link>
    </div>
  );
}
