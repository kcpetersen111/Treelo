import express, {Request, Response} from 'express';

import {User, Events, Containers, Boards} from "../persist/model";

export const eventSetUp = function(app:any){

    // the line below is a lie
    //will need to be able to get all events
    //fundemently broken but kept as an example to look at
    // app.get("/events", async (req:Request, res:Response)=>{
    //     // console.log(typeof req.user);
    //     if(!req.user){
    //         res.status(401).json({message:"unauthed"});
    //         return;
    //     }
    //     let list:Array<Object>;
    //     try {
    //         list = await Events.find({ownerID: req.user.id}, "-password");
    //     } catch (error) {   
    //         console.log("error in retiving all events by a user ",error);
    //         res.status(500).json(error);
    //         return;
    //     }
    //     res.status(200).json(list);
    // });

    //will need to be able to get events by id

    //will need to be able to update events by id

    //will need to be able to delete events by id
    // app.delete("/event/:id", async (req:Request, res:Response)=>{
    //     //fix this later
    //     if (!req.user){
    //         res.status(404).json({ message: "unauthed"});
    //         return;
    //     }
    //     let event;
    //     try{
    //         event = await Events.findById(req.params.id);
    //     }catch (err){
    //         res.status(500).json({
    //             message: `failed to delete event`,
    //             error: err,
    //         });
    //         return;
    //     }
    //     if( event == null){
    //         res.status(404).json({
    //             message: `cannot find event`,
    //             event_id: req.params.event_id,
    //         });
    //         //console.log("cannot find it");
    //         return;
    //     }
    //     if( event.user_id)



    //needs to be reworked
    //will need to create an event
    app.post("/events/:boardId/:containerId", async (req:Request, res:Response)=>{
        const boardID = req.params.boardId;
        const containerId = req.params.containerId;
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        
        
    });
    //will need to mark an event as complete by id

    
}