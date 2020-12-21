import http from "../http-common";

class MapService {
  getAll() {
    return http.get("/maps");
  }

  get(id) {
    return http.get(`/maps/${id}`);
  }

  create(data) {
    return http.post("/maps", data);
  }

  update(id, data) {
    return http.put(`/maps/${id}`, data);
  }

  delete(id) {
    return http.delete(`/maps/${id}`);
  }

  deleteAll() {
    return http.delete(`/maps`);
  }
}

export default new MapService();
