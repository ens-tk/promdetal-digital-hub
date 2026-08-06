import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-2 text-xl font-semibold text-foreground">Страница не найдена</p>
        <p className="mb-6 max-w-md text-muted-foreground">
          Мы обновили сайт, и старая ссылка могла устареть или перестать работать.
          Пожалуйста, перейдите на главную страницу, чтобы найти нужный раздел.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
