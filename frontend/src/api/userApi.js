export const userApi = {
    getUserProfile: async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        return response.json();
    }
};
