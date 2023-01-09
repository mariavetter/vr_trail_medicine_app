import User from './userModel';
import Run from './runModel';
import Task1 from './task1Model';
import Task2 from './task2Mode';
import Task3 from './task3Model';


export default class VrTrailApi {

    // Singelton instance
    static #api = null;

    #vrTrailApiBaseURL = 'http://127.0.0.1:5000/backend'
    #unityBaseURL = 'http://127.0.0.1:4444/'
    /**
     * Singleton Instanz erhalten
     * 
     * @public
     */
    static getAPI() {
      if (this.#api == null) {
        this.#api = new VrTrailApi();
      }
      return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init, {credential: 'include'})
      .then(res => {
        // Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen, auch wenn die Antwort ein HTTP 404 oder 500 ist.
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      }
      )

    #fetchUnity = (url, init) => fetch(url, init, {credential: 'include'})
      .then(res => {
        // Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen, auch wenn die Antwort ein HTTP 404 oder 500 ist.
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
      }
      )

    #postUnityURL = () => `${this.#unityBaseURL}`;

    #getUserURL = () => `${this.#vrTrailApiBaseURL}/user`;
    #getUserByIdURL = (id) => `${this.#vrTrailApiBaseURL}/user-by-id/${id}`;
    #postUserURL = () => `${this.#vrTrailApiBaseURL}/user`;

    #getRunURL = () => `${this.#vrTrailApiBaseURL}/runs`;
    #getRunByIdUserURL = (id) => `${this.#vrTrailApiBaseURL}/run-by-iduser/${id}`;
    #postRunURL = () => `${this.#vrTrailApiBaseURL}/runs`;

    #getTask1ByIdURL = (id) => `${this.#vrTrailApiBaseURL}/task1-by-id/${id}`;
    #getTask2ByIdURL = (id) => `${this.#vrTrailApiBaseURL}/task2-by-id/${id}`;
    #getTask3ByIdURL = (id) => `${this.#vrTrailApiBaseURL}/task3-by-id/${id}`;

    sendRunToUnity(newRun) {
      return this.#fetchUnity(this.#postUnityURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(newRun)
      })
    }

    getUser() {
      return this.#fetchAdvanced(this.#getUserURL()).then((responseJSON) => {
        let userModels = User.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(userModels);
        })           
      })
    }

    getUserById(id) {
      return this.#fetchAdvanced(this.#getUserByIdURL(id)).then((responseJSON) => {
        let user = User.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(user);
        })
      })
    }

    postUser(user) {
      return this.#fetchAdvanced(this.#postUserURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(user)
      })
    }

    getRun() {
      return this.#fetchAdvanced(this.#getRunURL()).then((responseJSON) => {
        let runModels = Run.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(runModels);
        })           
      })
    }

    postRun(run) {
      return this.#fetchAdvanced(this.#postRunURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(run)
      })
    }
    
    getRunByIdUser(id) {
      return this.#fetchAdvanced(this.#getRunByIdUserURL(id)).then((responseJSON) => {
        let run = Run.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(run);
        })
      })
    }

    getTask1ById(id) {
      return this.#fetchAdvanced(this.#getTask1ByIdURL(id)).then((responseJSON) => {
        let task1 = Task1.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(task1);
        })
      })
    }

    getTask2ById(id) {
      return this.#fetchAdvanced(this.#getTask2ByIdURL(id)).then((responseJSON) => {
        let task2 = Task2.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(task2);
        })
      })
    }

    getTask3ById(id) {
      return this.#fetchAdvanced(this.#getTask3ByIdURL(id)).then((responseJSON) => {
        let task3 = Task3.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(task3);
        })
      })
    }
}