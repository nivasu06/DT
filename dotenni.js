import { Router } from "express";
import { getDatabase } from "./fileUpload.js";
import { fileupload } from "./multer.js";
import { ObjectId } from "mongodb";
const router = Router();
export default router;

router.post("/events", fileupload.single("files"), async (req, res) => {
    console.log("Body:", req.body);
    console.log("File:", req.file); 
    try {
        const { name, tagline, schedule, description, number, moderator, category, sub_category, rigor_rank } = req.body;
        const files = req.file ? req.file.path : null;

        const newData = {
            name,
            files,
            tagline,
            schedule,
            description,
            number,
            moderator,
            category,
            sub_category,
            rigor_rank
        };
        const db = getDatabase();
        await db.collection("events").insertOne(newData);
        res.status(201).send("Event Created Successfully");
    } catch (err) {
        console.error("Error saving event:", err);
        res.status(500).send("Error saving event");
    }
});
router.get("/events/:id", async (req, res) => {
    const { id } = req.params;
    const { number,name } = req.query;
    console.log("Received ID:", id);
    console.log("Received number:", number);
    try {
        const db = getDatabase();
        
        const event = await db.collection("events").findOne({
            _id: new ObjectId(id),
            number:number.toString(),
            name:name.trim()
        });
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).send("Event not found");
        }
    } catch (err) {
        console.error("Error fetching event:", err);
        res.status(500).send("Error fetching event");
    }
});
router .delete("/events/:id",async(req,res)=>{
    const{id}=req.params;
    console.log("Received ID for deletion:", id);
    try{
        const db=getDatabase();
        const result=await db.collection("events").deleteOne({_id:new ObjectId(id)});
        if(result){
            res.status(200).send("Event deleted Successfully");
        }else{
            res.status(404).send("Event not found");
        }
    }catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).send("Error deleting event");
    }
})
