import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const routeValidations = {
    dashboard: pathname === "/dashboard",
    plantillas: pathname.includes("/plantillas"),
    institution: pathname.includes("/institucion"),
    institutionClients: pathname.includes("/institucion/clientes"),
    institutionGroups: pathname.includes("/institucion/grupos"),
    institutionCenters: pathname.includes("/institucion/centros"),
    accounting: pathname.includes("/contabilidad"),
    reports: pathname === "/reportes",
    administrationTab: pathname.includes("/administracion"),
    administrationUsers: pathname.includes("/administracion/usuarios"),
    administrationOrganization: pathname.includes("/administracion/organizacion"),
    administrationSystem: pathname === "/administracion/sistema",
    administrationProducts: pathname === "/administracion/productos",
    selfManagementUserManagement: pathname.includes("/autoservicio/gestion-de-usuarios"),
  };

  const isProtectedRoute = Object.values(routeValidations).some(Boolean);

  if (isProtectedRoute) {
    const token = req.cookies.get("auth-token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/plantillas/:path*",
    "/institucion/:path*",
    "/contabilidad/:path*",
    "/reportes",
    "/administracion/:path*",
    "/autoservicio/gestion-de-usuarios/:path*",
  ],
};
