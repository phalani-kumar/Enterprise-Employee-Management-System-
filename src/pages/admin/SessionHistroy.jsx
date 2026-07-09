useEffect(()=>{

loadHistory();

},[])

const loadHistory = async()=>{

const response=await axios.get(
`http://127.0.0.1:8000/login-devices/history/${currentUser.company_id}`
);

setHistory(response.data);

}