import * as analyticsService from "../../application/services/analyticsService.js"

export async function collectEvent(req, res, next) {

    try{
       
    const payload = req.body;

    await analyticsService.collectEvent(payload);

    res.status(201).json({
        success: true
    });

    }catch (error) {
        next(error);
    }
    
}