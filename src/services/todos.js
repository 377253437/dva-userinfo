/**
 * @file sevice方法
 * @author  lizhengtai@sensordata.cn
 */
import request from '../utils/request';

export function getTodo(params) {
  return request('/api/todos',{
    method: 'GET',
    params:params
  });
}

export function addTodo(data) {
  return request(
    '/api/todos',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    },
  );
}

export function deleteTodo(id) {
  return request(
    `/api/todos/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export function editTodo(id,data) {
  return request(
    `/api/todos/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    },
  );
}

export function toggleTodoStatus(id, status) {
  return request(
    `/api/todos/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ status: !status }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    },
  )
}

// export function searchTodo(title) {
//   return request(`/api/todos/${title}`,{
//     method: 'GET',
//   });
// }


// export function selectAllTodo(status) {
//   return request(
//     `/api/todos/`,
//     {
//       method: 'PUT',
//       body: JSON.stringify({ status: !status }),
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//     },
//   )
// }

// export function cancleAllTodo(status) {
//   return request(
//     `/api/todos/`,
//     {
//       method: 'PUT',
//       body: JSON.stringify({ status: !status }),
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//     },
//   )
// }

// export function deleteAllTodo() {
//   return request(
//     `/api/todos`,
//     {
//       method: 'DELETE',
//     },
//   );
// }
