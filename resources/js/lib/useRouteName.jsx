import { usePage } from "@inertiajs/inertia-react";
import { useMemo } from "react";

/**
 * Extracts the current route and page name from the URL.
 * Usage: const { route, pageName } = useRouteAndPageName();
 */
export default function useRouteName() {
  const location = usePage();
  const { props } = location;

  const { route, pageName } = useMemo(() => {
    // Guard against missing pathname
    if (!props || !props.pathname) {
      return { route: '', pageName: 'Home' };
    }
    // Replace hyphens and underscores with spaces for title casing
    const cleanPath = props.pathname.replace(/[-_]/g, " ");
    const segments = cleanPath.split("/").filter(Boolean);
    let name = segments.length > 0 ? segments[segments.length - 1] : "Home";
    // Capitalize each word
    name = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { route: props.pathname, pageName: name };
  }, [props?.pathname]);

  return { route, pageName };
}
