import http from "./http";

export default class DataService {
  getAll() {
    return http.get("/items");
  }
  create(data) {
    return http.post("/items", data);
  }

  update(id, data) {
    return http.put(`/items/${id}`, data);
  }

  remove(id) {
    return http.delete(`/items/${id}`);
  }

}