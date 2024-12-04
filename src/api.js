const API_BASE_URL = "http://localhost:8080"; // Update with your backend base URL

// Generic function to make API requests

async function apiRequest(endpoint, method = "GET", body = null) {
    const headers = { "Content-Type": "application/json" };

    const config = {
        method,

        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.text();

        throw new Error(error || "Unknown error occurred");
    }

    return response.json();
}

// Category API functions

export const getAllCategories = () => apiRequest("/api/category");

export const getCategoryById = (id) => apiRequest(`/api/category/${id}`);

export const createCategory = (data) =>
    apiRequest("/api/category/create", "POST", data);

export const updateCategory = (id, data) =>
    apiRequest(`/api/category/${id}/update`, "PUT", data);

export const deleteCategory = (id) =>
    apiRequest(`/api/category/${id}/delete`, "DELETE");

// Item API functions

export const getAllItems = () => apiRequest("/api/item");

export const getItemById = (id) => apiRequest(`/api/item/${id}`);

export const createItem = (data) =>
    apiRequest("/api/item/create", "POST", data);

export const updateItem = (id, data) =>
    apiRequest(`/api/item/${id}/update`, "PUT", data);

export const deleteItem = (id) =>
    apiRequest(`/api/item/${id}/delete`, "DELETE");

// Transaction API functions

export const getAllTransactions = () => apiRequest("/api/transaction");

export const getTransactionById = (id) => apiRequest(`/api/transaction/${id}`);

export const createTransaction = (data) =>
    apiRequest("/api/transaction/create", "POST", data);

export const updateTransaction = (id, data) =>
    apiRequest(`/api/transaction/${id}/update`, "PUT", data);

export const deleteTransaction = (id) =>
    apiRequest(`/api/transaction/${id}/delete`, "DELETE");
