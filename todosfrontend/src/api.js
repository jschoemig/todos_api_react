const APIURL ='/api/todos/'; // could do: 'localhost:8081/api/todos' --> dev server issue because both node.js and react run on the same one


export async function getTodos(){       // export either here or after function with export default getTodos()
        return fetch(APIURL)            // because it is an async function 
        .then( resp => {
            if (!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: "Please try again later, server does not respond currently"};
                    throw err;
                }
                
            }
        return resp.json();
        });
}

export async function createTodo(val){
           return fetch(APIURL ,{               //async function requires to return fetch call! -- without async that would not have been required
            method: 'post',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify({name: val})
        }) 
        .then( resp => {
            if (!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: "Please try again later, server does not respond currently"};
                    throw err;
                }
                
            }
        return resp.json();
        })
}

export async function removeTodo(id){
      const deleteURL = APIURL + id;
      return fetch(deleteURL ,{                     //async function requires to return fetch call! -- without async that would not have been required
            method: 'delete',
        }) 
        .then( resp => {
            if (!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: "Please try again later, server does not respond currently"};
                    throw err;
                }
                
            }
        return resp.json();
        })
}

export async function updateTodo (todo){
        const updateURL = APIURL + todo._id;
        return fetch(updateURL ,{                   //async function requires to return fetch call! -- without async that would not have been required
            method: 'put',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify({completed: !todo.completed})
        }) 
        .then( resp => {
            if (!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } else {
                    let err = {errorMessage: "Please try again later, server does not respond currently"};
                    throw err;
                }
                
            }
        return resp.json();
        })
}