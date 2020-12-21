import http from "../http-common";

class CollegeService {
  getAll() {
    return http.get("/colleges");
  }

  get(id) {
    return http.get(`/colleges/${id}`);
  }

  create(data) {
    return http.post("/colleges", data);
  }

  update(id, data) {
    return http.put(`/colleges/${id}`, data);
  }

  delete(id) {
    return http.delete(`/colleges/${id}`);
  }

  deleteAll() {
    return http.delete(`/colleges`);
  }
}

export default new CollegeService();
