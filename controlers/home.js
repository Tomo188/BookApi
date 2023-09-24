const Book=require("../models/bookModels")

exports.home=(req,resp,next)=>{
    resp.status(200).send("it is home page")
}
exports.createBook=async(req,resp,next)=>{
    try{
      if(req.body.title && req.body.author && req.body.publishYear)
      await Book.create({title:req.body.title, author:req.body.author, publishYear:req.body.publishYear})
    }
    catch(err){
        console.error(err)
    }
    console.log(req.body)
    resp.status(200).send({
        success: true,
        ...req.body
    })
}
exports.showAllBooks=async(req,resp,next)=>{
    
    try{
      const books= await Book.find({}) 
       resp.status(200).send({
        success: true,
        books
      })
    }
    catch(err){
        console.error(err)
        resp.status(505).send({
            success: "fail",
            message:err.message,
            err
        })
    }

}
exports.showOneBook=async(req,resp,next)=>{
    try{
      const book=await Book.findById(req.params.id)
      resp.status(200).send({
        success:true,
        book
      })
    }catch(err){
        console.log(err)
        resp.status(500).send({
            status:fail,
            message:err.message
        })
    }
}
exports.updateBook=async(req,resp,next)=>{
    try {
        if(req.body.title && req.body.author && req.body.publishYear){
            const book=await Book.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear
            })
            if(book){
                return resp.status(200).json({success:true,message:"book updated successfully"})
            }else{
                return resp.status(404).json({success:false,message:"Book not found"})
            }
        }
        
    } catch (error) {
        console.log(error)
        resp.status(500).send({status:fail, message:err.message})
    }
}
exports.deleteBook=async (req,resp,next)=>{
    try {
        const deleteBook=await Book.findByIdAndDelete(req.params.id)
        if(deleteBook)
        return resp.status(200).json({success:true, message:"Book deleted successfully",deleteBook})
        return resp.status(404).json({success:false,message:"Book not found"})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({success:false,message:error.message})
        
    }
}