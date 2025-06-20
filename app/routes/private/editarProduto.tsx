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
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditarProdutoModal({ produto, onClose, onSuccess }: Props) {
    const [codigo, setCodigo] = useState(produto.codigo);
    const [descricao, setDescricao] = useState(produto.descricao);
    const [erro, setErro] = useState("");

    const handleSalvar = async () => {
        const result = await MySwal.fire({
            title: "Tem certeza?",
            text: "Deseja realmente editar esse Item?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, editar!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await api.put(`/editarProduto/${produto.id}`, {
                    codigo,
                    descricao,
                });

                onSuccess();
            } catch (err) {
                setErro("Erro ao atualizar produto");
                console.error(err);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4 text-black">Editar Produto</h2>

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
                    maxLength={30}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancelar
                    </button>
                    <button onClick={handleSalvar} className="px-4 py-2  bg-blue-600 text-white rounded">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}