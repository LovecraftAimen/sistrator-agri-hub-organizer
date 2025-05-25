
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeNames: Record<string, string> = {
  "/": "Dashboard",
  "/servicos": "Serviços",
  "/beneficiarios": "Beneficiários",
  "/tratoristas": "Tratoristas",
  "/agendamentos": "Agendamentos",
  "/relatorios": "Relatórios",
  "/documentos": "Documentos",
  "/configuracoes": "Configurações",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Início", href: "/" },
  ];

  let currentPath = "";
  pathnames.forEach((name) => {
    currentPath += `/${name}`;
    const label = routeNames[currentPath] || name;
    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  if (breadcrumbs.length === 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isFirst = index === 0;

        return (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
            {isLast ? (
              <span className="font-medium text-foreground">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.href!}
                className={cn(
                  "hover:text-foreground transition-colors",
                  isFirst && "flex items-center gap-1"
                )}
              >
                {isFirst && <Home className="w-4 h-4" />}
                {breadcrumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
