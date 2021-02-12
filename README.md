# custom-hooks
custom hooks, and node.js punctions and templates

custom libraries for javascript, react, and node.js applications

how to use the useFetch custom hook:

________________________________________________________________________________________________________

//making GET requests

// useGET():

let { data: blogs, isPending, error }= useGET('http://localhost:9000/endpoint')

//returns 3 variables in an object data: the responce from the fetch request isPending: boolean for whether data is returned yet error: returns error description if fetch request fails

________________________________________________________________________________________________________

//sending post requests

//create a subcrime useState if the post request is inside of an onClick or onSubmit callback to prevent multiple requests at a time
const [sub, setSub] = useState(false) const [resData, setReqData] = usePOST(sub);

//send the request data in the same object along with the url to the endpoint you want.

setReqData({url:'http://localhost:9000/endpoint/', bar, foo, ver... })

//if you are sending an object to an endpoint, you can use destructuring to merge the url with the object.

setReqData({url:'http://localhost:9000/endpoint/', ...objData ))

//if the post request is in a submit handler like post post requests: 

const submitHandler = e =>{ e.preventDefault();

//set submit state to true 

setSub(!sub) 

//send data in setReqData 

setReqData({url:'http://localhost:9000/blogs/', ...onjData}) 

//set submit to false setSub(!sub) }
