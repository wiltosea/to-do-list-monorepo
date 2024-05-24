import http from "./http";

export default class DataService {
  getAll() {
    return http.get("/items");
  }

  // get(id) {
  //   return http.get(`/items/${id}`);
  // }

  create(data) {
    return http.post("/items", data);
  }

  update(id, data) {
    return http.put(`/items/${id}`, data);
  }

  delete(id) {
    return http.delete(`/items/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/items`);
  // }

  // findByTitle(title) {
  //   return http.get(`/items?title=${title}`);
  // }
}