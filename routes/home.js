const express=require("express")
const  homeRoutes=require("../controlers/home")
const router=express.Router()

router.route("/").get(homeRoutes.home)
router.route("/books").post(homeRoutes.createBook).get(homeRoutes.showAllBooks)
router.route("/books/:id").get(homeRoutes.showOneBook).put(homeRoutes.updateBook).delete(homeRoutes.deleteBook)
module.exports=router

