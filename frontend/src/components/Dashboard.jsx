import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const Dashboard = () => {
    const {user, isLoading, updateProfile, deleteProfile} = useAuthStore()
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user]);

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login")
        }
    }, [user, isLoading, navigate]);

    const handleUpdate = async () => {
        try {
            if (newPassword && newPassword !== confirmPassword) {
                toast.error("Les mots de passe ne correspondent pas !");
                return;
            }

            const updateData = {name, email};

            if (newPassword) {
                updateData.newPassword = newPassword;
            }
            await updateProfile(updateData.name, updateData.email, updateData.newPassword);
            toast.success("Profil mis à jour avec succès !");
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (e) {
            toast.error(`Erreur : ${e.message}`)
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProfile();
            toast.success("Compte supprimé avec succès !");
            navigate("/login");
        } catch (e) {
            toast.error(`Erreur : ${e.message}`)
        }
    };

    if (isLoading) {
        return <p>Verification de l&#39;authentification...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Dashboard</h1>
                {user ? (
                    <div className="space-y-4">
                        {/* Champ modifiable pour le nom */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                                Nom
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Champ modifiable pour l'email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Champ modifiable pour le mot de passe */}
                        <div className="flex flex-col">
                            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 mb-1">
                                Nouveau mot de passe
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                                Confirmez le nouveau mot de passe
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Bouton pour mettre à jour le profil */}
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Mettre à jour le profil
                        </button>

                        {/* Bouton pour afficher le modal de confirmation */}
                        <button
                            onClick={() => setShowModal(true)} // Afficher le modal
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-4"
                        >
                            Supprimer le compte
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Chargement...</p>
                )}
            </div>

            {/* Modal de confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirmer la suppression</h2>
                        <p className="text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end space-x-4">
                            {/* Bouton Annuler */}
                            <button
                                onClick={() => setShowModal(false)} // Fermer le modal
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
                            >
                                Annuler
                            </button>
                            {/* Bouton Confirmer */}
                            <button
                                onClick={() => {
                                    handleDelete(); // Supprimer le profil
                                    setShowModal(false); // Fermer le modal après suppression
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;