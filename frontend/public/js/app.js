import { activityRooms, getFile, getLocation, sendFile, sendLocation, sendMassage, showCategory, showMassage, userIstyping } from "../../utils/func.js";

window.addEventListener('load',async()=>{
    const token=localStorage.getItem('token')
   if (token) {
    const res=await fetch('http://localhost:4003/api/auth/me',{
        headers:{
            authorization:`Bear ${token}`
        }
    })
   if (res.status===200) {
      const user=await res.json()
      const socket=io('http://localhost:4003')
      socket.on("connect",()=>{
        
          socket.on("namespaces",(namespaces)=>{
              
     
              showCategory(namespaces,user)
              activityRooms(namespaces)
              sendMassage()
              showMassage()
              userIstyping()
              sendLocation()
              getLocation()
              sendFile()
              getFile()
          })
      })
   }else{
    location.href='./pages/register.html'
   
   }
   }else{
       location.href='./pages/register.html'
   }
  
})