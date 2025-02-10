const jsonHandler = (result, skipParsing) => {
    if (result.ok && result.status >= 200 && result.status < 400) {
        if (!skipParsing && result.status !== 204) {
            return result.json();
        }
        return result;
    }
    if (result .status === 401) {
        window.location.href = '/'
    }
    return Promise.reject(result);
};

  const makeRequest = async (endpoint = '', method = 'GET', body = undefined, skipParsing = false) => {
    const url= decodeURIComponent(`https://frontend-take-home-service.fetch.com${endpoint}`)

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(url, {
        credentials: 'include',
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });
  
      const json = await jsonHandler(response, skipParsing);
      return Promise.resolve(json)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const withParams = (params) => params ? `?${params}` : ''

  // login should maybe return a 204 instead of 200? skipping the parse step
  export const login = (body) => makeRequest('/auth/login', 'POST', body, true)

  export const searchForDogs = (queryParams) => makeRequest(`/dogs/search?${queryParams}`)
  
  export const getDogBreeds = () => makeRequest('/dogs/breeds')

  export const getMatch =(body) => makeRequest('/dogs/match', 'POST', body)

  export const getDogsByIds = (ids) => makeRequest('/dogs', 'POST', ids)