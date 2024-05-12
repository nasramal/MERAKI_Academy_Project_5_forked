const notification = (socket,io)=>{

   
    socket.on("notification",(data)=>{
        console.log (data)
        data.success=true
        socket.to("room-"+data.to).emit("notification",data)
        socket.emit("notification",data)
        
        })
        

}


module.export = notification