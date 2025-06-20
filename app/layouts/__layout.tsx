import { redirect, type LoaderFunctionArgs } from 'react-router';
import api from '../services/api';
import { Outlet } from "react-router";
import { Nav } from '../components/nav';

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = request.headers.get('cookie');

    // Você pode extrair o token do cookie (ex: com 'cookie' lib ou manualmente)
    const token = cookie?.match(/token=([^;]+)/)?.[1];
    if (!token) return redirect('/');

    try {
        await api.get('/verificar', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return null;
    } catch {
        return redirect('/');
    }
}

export function meta() {
    return [
        { name: "robots", content: "noindex, nofollow" },
    ];
}

export default function ProtectedLayout() {


    return <>
        <Nav />
        <Outlet />
    </>;
}