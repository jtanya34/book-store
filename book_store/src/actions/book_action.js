import { 
  BUYBOOK
   
} from '../constants';
export const getBooks = async() => {
    const url = "http://localhost:4001/auth/books";
    const res=await fetch(url,{method:'GET',mode:'cors',
    headers:{"Content-Type": "application/json",
    Authorization:  localStorage.getItem('token')
},
})
    const json = await res.json();
    return json

  }


export const checkToken = async (token) => {
  const url = "http://localhost:4001/auth/checkToken";
const res=await fetch(url,{method:'GET',mode:'cors',
        headers:{"Content-Type": "application/json",
        Authorization:  localStorage.getItem('token')
    },
    })
    const result=await res.json();
  if (result.success) {
    const books=await getBooks();
    const status= { loading:true, redirect:false,books:books }
    return status
  
  } else {
    const status= { loading:false, redirect:true }
    return status
  }
}

export const buyBook = ( id ) => {
 const email=localStorage.getItem('email');
  return async dispatch => {
      const url = `http://localhost:4001/auth/buyBook/${id}/${email}`;
      const response = await fetch(url,{method:'GET',mode:'cors',
      headers:{"Content-Type": "application/json"},
      
  });
  const data = await response.json();

  dispatch({
      type:BUYBOOK, val:{data}
  })    
}
}

export const addBook = ( book) => {
  console.log('addbook',book);
  const sellerId=localStorage.getItem('sellerId');
   return async dispatch => {
       const url = `http://localhost:4001/auth/addBook`;
       const response = await fetch(url,{method:'POST',mode:'cors',
       headers:{"Content-Type": "application/json"},
       body: JSON.stringify({
        description: book.description,
        price: book.price,
        title:book.title,
        units: book.units,
        sellerId:sellerId
    })
   });
   const data = await response.json();
 console.log(data)
   dispatch({
       type:BUYBOOK, val:{data}
   })    
 }
 }
 