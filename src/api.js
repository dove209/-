const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async keyword => {
    try {
      let result = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      return result.json();
    } catch (e) {
      console.log(e);
      return e.message
    }
  },

  fetchCatDetails: async id => {
    try {
      let result = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      return result.json();
    } catch (e) {
      console.log(e);
      return e.message
    }
  },

  fetchCatRandoms: async () => {
    try {
      let result = await fetch(`${API_ENDPOINT}/api/cats/random50`);
      return result.json();
    } catch (e) {
      console.log(e);
      return e.message
    }
  }
};



