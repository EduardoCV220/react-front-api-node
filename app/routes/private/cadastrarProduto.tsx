// src/components/EditarProdutoModal.tsx
import { useState } from "react";
import api from "../../services/api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface Props {
    produto: {
        id: number;
        codigo: string;
        descricao: string;
    };
}

export default function cadastrarProduto({ produto }: Props) {
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState("");

    const handleSalvar = async () => {

        if (!codigo || !descricao) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }
        const result = await MySwal.fire({
            title: "Tem certeza?",
            text: "Deseja realmente cadastrar esse Item?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, cadastrar!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const res = await api.post(`/cadastrarProduto`, {
                    codigo,
                    descricao,
                });

                if (res.data.status == 'success') {
                    MySwal.fire({
                        title: "Sucesso",
                        text: "Produto cadastrado com sucesso",
                        icon: "success"
                    });
                    return;
                }
                else {
                    MySwal.fire({
                        title: "Erro",
                        text: res.data.message,
                        icon: "error"
                    });
                }

            } catch (err) {
                setErro("Erro ao cadastrar produto");
                console.error(err);
            }
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4 text-black">Cadastrar Produto</h2>

                {erro && <p className="text-red-500 mb-2">{erro}</p>}

                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="w-full px-3 py-2 mb-3 border border-black text-black rounded"
                    placeholder="Código"
                    required
                    maxLength={30}
                />
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full px-3 py-2 mb-3  border-black text-black border rounded"
                    placeholder="Descrição"
                    required
                    maxLength={30}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={handleSalvar} className="px-4 py-2  bg-blue-600 text-white rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}