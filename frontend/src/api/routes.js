import http from "./http";

export default class DataService {
  getAll() {
    return http.get("/list");
  }

  get(id) {
    return http.get(`/list/${id}`);
  }

  create(data) {
    return http.post("/list", data);
  }

  update(id, data) {
    return http.put(`/list/${id}`, data);
  }

  delete(id) {
    return http.delete(`/list/${id}`);
  }

  deleteAll() {
    return http.delete(`/list`);
  }

  findByTitle(title) {
    return http.get(`/list?title=${title}`);
  }
}