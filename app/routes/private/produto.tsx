import { Component, useState, useEffect } from "react";
import api from '../../services/api';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditarProdutoModal from "./editarProduto";

const MySwal = withReactContent(Swal)



interface Produto {
    id: number,
    codigo: string;
    descricao: string;
}
// import Companies from "~/class/Companies";



export default function Produto() {
    const [companies, setCompanies] = useState([]);

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [erro, setErro] = useState("");

    const [filtroCampo, setFiltroCampo] = useState<"1" | "2">("1");
    const [filtroValor, setFiltroValor] = useState("");
    const [modalAberta, setModalAberta] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

    async function carregarProdutos(filtroCampo, filtroValor) {
        try {
            const res = await api.get("/listarProdutos", {
                params: {
                    campo: filtroCampo,
                    valor: filtroValor
                }
            });
            setProdutos(res.data);
        } catch (err) {
            setErro("Erro ao carregar os produtos.");
            console.error(err);
        }
    }

    useEffect(() => {
        carregarProdutos(filtroCampo, filtroValor);
    }, [filtroCampo, filtroValor]);


    // useEffect(() => {
    //     async function carregarProdutos() {
    //         try {
    //             const res = await api.get("/listarProdutos", {
    //                 params: {
    //                     campo: filtroCampo,
    //                     valor: filtroValor
    //                 }
    //             });
    //             setProdutos(res.data);
    //         } catch (err) {
    //             setErro("Erro ao buscar produtos.");
    //             console.error(err);
    //         }
    //     }


    //     carregarProdutos();
    // }, [filtroCampo, filtroValor]);


    async function deletarProduto(id: number) {
        const result = await MySwal.fire({
            title: "Tem certeza?",
            text: "Essa ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const res = await api.delete(`/deletarProduto/${id}`);

                if (res.data.status == 'success') {
                    MySwal.fire({
                        title: "Sucesso",
                        text: "Produto deletado com sucesso",
                        icon: "success"
                    })
                    carregarProdutos(null, null);
                }
                else {
                    MySwal.fire({
                        title: "erro",
                        text: res.data.mensagem,
                        icon: "error"
                    })
                }
                // Atualize a lista ou use location.reload se necessário
                // location.reload();
            } catch (err) {
                console.error(err);
                setErro("Erro ao deletar produto.");
            }
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>

            {erro && <p className="text-red-500 mb-4">{erro}</p>}

            {/* Filtro */}
            <div className="flex items-center gap-4 mb-6">
                <select

                    value={filtroCampo}
                    onChange={e => setFiltroCampo(e.target.value as "1" | "2")}
                    className="border px-3 py-2 rounded-md  bg-white text-black"
                >
                    <option value="1">Código</option>
                    <option value="2">Descrição</option>
                </select>

                <input
                    type="text"
                    placeholder={`Buscar por ${(filtroCampo == '1' ? 'codigo' : 'descrição')}`}
                    value={filtroValor}
                    onChange={e => setFiltroValor(e.target.value)}
                    className="border px-4 py-2 uppercase bg-white rounded-md w-64 text-black"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-black bg-white border border-gray-200 shadow-md">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-2 px-4 border-b">Código</th>
                            <th className="py-2 px-4 border-b">Descrição</th>
                            <th className="py-2 px-4 border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{produto.codigo}</td>
                                <td className="py-2 px-4 border-b">{produto.descricao}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => deletarProduto(produto.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Excluir"
                                    >
                                        <TrashIcon className="h-5 w-5 inline" />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setProdutoSelecionado(produto);
                                            setModalAberta(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <PencilIcon className="h-5 w-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalAberta && produtoSelecionado && (
                <EditarProdutoModal
                    produto={produtoSelecionado}
                    onClose={() => {
                        setModalAberta(false);
                        setProdutoSelecionado(null);
                    }}
                    onSuccess={() => {
                        setModalAberta(false);
                        carregarProdutos(null, null);
                    }}
                />
            )}
        </div >

    );
}
//   return <Companies />;
