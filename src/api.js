import axios from "axios";

export default class Api {
  constructor() {
    this.client = null;
    this.api_url = "https://pokeapi.co/api/v2";
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  getPokemon = (id) => {
    return this.init().get(`${this.api_url}/pokemon/${id}`);
  };
}
