import { useState } from "react";
import toast from "react-hot-toast";

const useChangePassword = () => {
	const [loading, setLoading] = useState(false);

	const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
		const success = handleInputErrors({ currentPassword, newPassword, confirmPassword });
		if (!success) return false;

		setLoading(true);
		try {
			const API = import.meta.env.VITE_API_URL || "";
			const res = await fetch(`${API}/api/auth/change-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			toast.success(data.message || "Password changed successfully!");
			return true;
		} catch (error) {
			toast.error(error.message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { loading, changePassword };
};

function handleInputErrors({ currentPassword, newPassword, confirmPassword }) {
	if (!currentPassword || !newPassword || !confirmPassword) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (newPassword !== confirmPassword) {
		toast.error("New passwords don't match");
		return false;
	}

	if (newPassword.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	if (currentPassword === newPassword) {
		toast.error("New password must be different from current password");
		return false;
	}

	return true;
}

export default useChangePassword;
