import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    route("produto", "routes/produto.tsx"),
    route("home", "routes/home.tsx")
] satisfies RouteConfig;
