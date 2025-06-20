import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { redirect, type LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) return redirect("/");

  // (opcional) validar token com backend
  return null;
}
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
