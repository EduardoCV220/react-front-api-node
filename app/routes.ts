import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    layout("layouts/__layout.tsx", [
        route("produto", "routes/private/produto.tsx"),
        route("cadastrarProduto", "routes/private/cadastrarProduto.tsx"),
        route("home", "routes/private/home.tsx")
    ])
] satisfies RouteConfig;
