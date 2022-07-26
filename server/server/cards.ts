import express, {Request, Response} from 'express';
import mongoose from 'mongoose';


import {User, Cards, Containers, Boards} from "../persist/model";

export const cardSetUp = function(app:any){

    app.post("/container/:containerId/card", async (req:Request, res:Response)=>{
        const containerId = req.params.containerId;
        
        if(!req.user){
            res.status(401).json({message:"unauthed"});
            return;
        }
        let container:any;
        try {
            container = await Containers.findById(containerId);
        } catch (err) {
            res.status(500).json(err)
            return;
        }
        if(!container){
            res.status(404).json({message:"Container not found"});
            return;
        }
        if(container.creatorID != req.user.id){
            res.status(403).json({message:"User is not autherized to create a card on this container"});
            return;
        }

        let card = {
            name: req.body.name,
            date: req.body.date,
            category: req.body.category,
            creatorID: req.user.id,
            done: false,
        }
        let newCardIndb;
        try {
            newCardIndb = await Cards.create(card);
        } catch (error) {
            res.status(500).json(error);
            return
        }
        let newCard;
        try {
            newCard = await Containers.findByIdAndUpdate(
                containerId,
                {
                    $push:{
                        cards:newCardIndb._id,
                    }
                },
                {new:true});
        } catch (err) {
            res.status(500).json(err);
            return;
        }
        res.status(201).json(newCardIndb);
        
                            

    });
    
    app.get("/card/:cardId", async (req:Request, res:Response) => {
       const id = req.params.cardId;
       if(!req.user){
            res.status(401).json({message:"User unauthorized"});
            return;
       } 
       let card;
       try {
            card = await Cards.findById(id);
       } catch (error) {
            res.status(500).json(error);
            return;
       }
       if(!card){
        res.status(404).json({message:"page does not exist"});
        return;
       }
       if(card.creatorID != req.user.id){
            res.status(403).json({message:"User is not allowed to get that card"});
            return;
       }
       res.status(200).json(card);
    });

    app.get("/board/:boardId/container/:containerId/card",async (req:Request, res:Response) => {
        const boardId = req.params.boardId;
        const containerId = req.params.containerId;

        if(!req.user){
            res.status(401).json({message:"User is unauthenticated"});
            return;
        }
        let container;
        try {
            container = await Containers.findById(containerId);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        if(!container){
            res.status(404).json({message:"page not found"});
            return;
        }
        if(container.creatorID != req.user.id){
            res.status(403).json({message:"User is not unauthorized to get this"});
            return;
        }
        res.status(200).json(container.cards);
    });

    app.put("/board/:boardId/container/:containerId/card/:cardId",async (req:Request,res:Response) => {
        if(!req.user){
            res.status(401).json({message:"User is not logged in"});
            return;
        }
        const cardId = req.params.cardId;
        let card;
        try {
            card = await Cards.findById(cardId);
        } catch (err) {
            res.status(500).json(err);
            return;
        }
       
        if(!card){
            res.status(404).json({message:"Not found"});
            return;
        }
        if(req.user.id != card.creatorID){
            res.status(403).json({message:"You are not allowed to do that"});
            return;
        }
        try {
            card = await Cards.findByIdAndUpdate(cardId,
                {
                    name: req.body.name,
                    date: req.body.date,
                    category: req.body.category,
                }
                    ,{new:true});
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        res.status(200).json(card);
        
        
    });

    app.delete("/board/:boardId/container/:containerId/card/:cardId", async (req:Request, res:Response) => {
        if(!req.user){
            res.status(401).json({message:"You are not logged."});
            return;
        }
        const cardId = req.params.cardId;
        const containerId = req.params.containerId;
        let card;
        try {
            card = await Cards.findById(cardId);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        if(!card){
            res.status(404).json({message:"Card not found"});
            return;
        }
        if(req.user.id != card.creatorID){
            res.status(403).json({message:"You are not allowed to do that"});
            return;
        }
        let container;
        try {
            container = await Containers.findById(containerId);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        if(!container){
            res.status(404).json({message:"Container not found"});
            return;
        }
        
        try {
            container = await Containers.findByIdAndUpdate(containerId,
                                                {
                                                    $pull:{
                                                        cards:cardId,
                                                    }
                                                },
                                                {new:true});
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        try {
            card = await Cards.findByIdAndDelete(cardId);
        } catch (error) {
            res.status(500).json(error);
            return;
        }
        res.status(200).json(container);
    });



}
