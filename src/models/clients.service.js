import http from '../actions/http-common'

class ServiceProvider{
    getAll(){
        return http.get('/clients');
    }
    get(id) {
        return http.get('/clients/${id}');
      }
    
      create(data) {
        return http.post("/clients", data);
      }
    
      update(id, data) {
        return http.put('/clients/${id}', data);
      }
    
      delete(id) {
        return http.delete('/clients/${id}');
      }
    
      deleteAll() {
        return http.delete('/clients');
      }
    
      findByTitle(title) {
        return http.get('/tutorials?title=${title}');
      }
    }

    export default new ServiceProvider();