import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ru", "kg"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*$).*)"],
};
