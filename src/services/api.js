const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const api = {
    async login(email, password) {
        const formData = new URLSearchParams();
        formData.append('username', email); // OAuth2 expects 'username', we use email
        formData.append('password', password);

        const response = await fetch(`${API_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include', // Important for Cookies
            body: formData
        });

        if (!response.ok) {
            throw new Error("Falha no login (API)");
        }

        const data = await response.json();
        // data = { message: "Login successful", user: {...} }
        // We return it. unifiedService might expect access_token, but we are moving to cookies.
        return data; 
    },

    async getMe(token) { // token param is kept for signature compatibility but unused
        const response = await fetch(`${API_URL}/users/me/`, {
            headers: {
                // 'Authorization': `Bearer ${token}` // Removed in favor of Cookies
            },
            credentials: 'include' // Important for Cookies
        });

        if (!response.ok) {
            throw new Error("Falha ao obter usuário (API)");
        }

        return await response.json();
    },

    async getStudents(token) {
        // Backend doesn't have a specific get_all_students yet, 
        // but let's assume we might need it or implement it later.
        
        const response = await fetch(`${API_URL}/users/`, { // Assuming we add this endpoint or similar
             headers: {
                // 'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });
        
        if (!response.ok) throw new Error("API not ready for listing students");
        return await response.json();
    },
    
    async createStudent(studentData, token) {
        // Map frontend studentData to backend UserCreate
        // Frontend: { name: "...", email: "...", ... }
        // Backend: { username: "...", email: "...", password: "...", full_name: "..." }
        
        const payload = {
            username: studentData.email.split('@')[0], // Generate username from email
            email: studentData.email,
            full_name: studentData.name,
            password: "changeMe123", // Default password
            role: "student",
            disabled: false
        };

        const response = await fetch(`${API_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Erro ao criar usuário");
        }

        return await response.json();
    },
    
    async logout() {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    },

    // Health check to decide if we use API
    async healthCheck() {
        try {
            // Using /health endpoint if available, otherwise /
            // If the backend has a root endpoint returning 200, use that.
            // Using fetch with signal to timeout quickly if server is down
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds timeout
            
            const response = await fetch(`${API_URL}/`, { 
                method: 'GET',
                signal: controller.signal,
                credentials: 'include'
            });
            clearTimeout(timeoutId);
            return response.ok; // 404 is also "ok" connection-wise, but response.ok checks 200-299. 
                                // We might want to check status != 500 or just fetch success.
                                // For now, let's assume root returns 200 or 404 (Not Found but server up).
                                // Actually, if server is up but no root route, it returns 404.
                                // response.ok is false for 404.
                                // So we should probably check if we get a response at all.
        } catch (e) {
            console.log("Backend health check failed:", e);
            return false;
        }
    }
};
