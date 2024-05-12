const notificationmw=((socket,next)=>{
    if (socket[0]!=="notification"){
        next (new Error("socket middleware error"))
    }else{
        next()
    }
    })



module.export = notificationmw