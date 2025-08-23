// src/services/apiService.js
const API_BASE_URL = "https://localhost:7120/api";
//const API_BASE_URL = "http://localhost/FlexPlanner.Api/api";

class ApiService {
  constructor() {
    this.token = localStorage.getItem("authToken");
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...(options.headers || {}),
      },
      ...options,
    };

    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          window.location.href = "/login";
          return;
        }
        const error = await response.json().catch(() => ({}));
        throw new Error(
          error.message || `HTTP error! status: ${response.status}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // User methods
  async getCurrentUser() {
    return await this.request("/users/me");
  }

  async updateCurrentUser(userData) {
    return await this.request("/users/me", {
      method: "PUT",
      body: userData,
    });
  }

  async getTeamMembers(teamId) {
    return await this.request(`/users/team/${teamId}/members`);
  }

  // Planning methods
  async getMonthlyPlanning(year, month) {
    return await this.request(`/planning/monthly?year=${year}&month=${month}`);
  }

  async updateDayPlanning(date, statusCode, notes = null) {
    return await this.request("/planning/day", {
      method: "PUT",
      body: { date, statusCode, notes },
    });
  }

  async getWeeklySchedule() {
    return await this.request("/planning/weekly-schedule");
  }

  async updateWeeklySchedule(schedule) {
    return await this.request("/planning/weekly-schedule", {
      method: "PUT",
      body: schedule,
    });
  }

  // Vacation methods
  async getVacations() {
    return await this.request("/vacations");
  }

  async createVacation(vacationData) {
    return await this.request("/vacations", {
      method: "POST",
      body: vacationData,
    });
  }

  async deleteVacation(vacationId) {
    return await this.request(`/vacations/${vacationId}`, {
      method: "DELETE",
    });
  }

  // Configuration methods
  async getTeams() {
    return await this.request("/configuration/teams");
  }

  async getVacationTypes() {
    return await this.request("/configuration/vacation-types");
  }

  async getMonths() {
    return await this.request("/configuration/months");
  }

  async getYears() {
    return await this.request("/configuration/years");
  }
}

export const apiService = new ApiService();
