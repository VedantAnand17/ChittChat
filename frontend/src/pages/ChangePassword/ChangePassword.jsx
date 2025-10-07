import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useChangePassword from "../../hooks/useChangePassword";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { loading, changePassword } = useChangePassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const success = await changePassword({
            currentPassword,
            newPassword,
            confirmPassword
        });

        if (success) {
            // Clear form after successful password change
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            
            // Redirect to home after a short delay to show success message
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    Change Password
                    <span className="text-blue-500"> ChitChat</span>
                </h1>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-gray-800 dark:text-gray-200">Current Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="label p-2">
                            <span className="text-base label-text text-gray-800 dark:text-gray-200">New Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="label p-2">
                            <span className="text-base label-text text-gray-800 dark:text-gray-200">Confirm New Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button 
                            className="btn btn-block btn-sm bg-sky-500 text-white dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-700" 
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Change Password"}
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <Link 
                            to="/" 
                            className="text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200"
                        >
                            ← Back to Chat
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
