// src/services/apiService.js
const API_BASE_URL = "http://localhost:5161/api";
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

  async getTeamsWithCheckboxes() {
  return await this.request("/configuration/teams/checkboxes");
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

  // Team Reports methods
async getTeamPlanningReport(teamId, startDate, endDate) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });
  
  return await this.request(`/teamReports/${teamId}/planning?${params}`);
}

async exportTeamPlanningToExcel(teamId, startDate, endDate) {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate
  });

  try {
    const response = await fetch(`${API_BASE_URL}/teamReports/${teamId}/planning/export?${params}`, {
      method: 'GET',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Créer un blob avec les données Excel
    const blob = await response.blob();
    
    // Extraire le nom du fichier depuis les headers
    const contentDisposition = response.headers.get('content-disposition');
    let filename = 'planning_export.xlsx';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    
    // Nettoyer
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Erreur lors de l\'export Excel:', error);
    throw error;
  }
}

}

export const apiService = new ApiService();
