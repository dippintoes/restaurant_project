import { NextFunction, Request, Response, Router } from "express";
import { validateWebToken } from "../../utility/web-token-validator";
import { checkRole } from "../../utility/check-role";
import restaurantsServices from "./restaurants.services";
import { RESPONSE_HANDLER } from "../../utility/Response-handler";
import userServices from "../users/user.services";
import mongoose from "mongoose";
import { Roles } from "../roles/roles.types";
import { UserModel } from "../users/user.schema";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.findAll();
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})



router.get("/allApproved", validateWebToken, checkRole(["641988a2c3bac1ad2f2db6e4"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.allApproved();
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.get("/allRejected", validateWebToken, checkRole(["641988a2c3bac1ad2f2db6e4"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.allRejected();
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.get("/allPending", validateWebToken, checkRole(["641988a2c3bac1ad2f2db6e4"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.allPending();
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.post("/create", validateWebToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = res.locals.tokenId;
        const rest = req.body;
        const owner = await userServices.findOne({ _id: new mongoose.Types.ObjectId((id).toString()) });
        owner.role = Roles.OWNER;
        rest.ownerId = id;
        await UserModel.findByIdAndUpdate(new mongoose.Types.ObjectId((id).toString()), { $push: { "restaurants": rest } },
            {
                new: true,
            });
        const result = await restaurantsServices.createRes(rest);
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.patch("/update/:resId", validateWebToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = res.locals.tokenId;
        const restId = req.params.resId;
        const update = req.body;
        const result = await restaurantsServices.updateRes(id, restId, { _id: restId }, { $set: update });
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.patch("/addBranch/:id", validateWebToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = res.locals.tokenId;
        const restId = req.params.id;
        const update = req.body;
        const result = await restaurantsServices.updateBranch(id, restId, { _id: restId }, { $push: update });
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
});

router.patch("/manage_approval/:rest_id", validateWebToken, checkRole(["641988a2c3bac1ad2f2db6e4"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.approveRestaurant({ _id: req.params.rest_id }, { $set: req.body });
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
});

router.delete("/:id", validateWebToken, checkRole(["641988a2c3bac1ad2f2db6e4", "641988d1c3bac1ad2f2db6e8"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantsServices.deleteOne({ _id: req.params.id }, { $set: { isDeleted: true } });
        res.send(new RESPONSE_HANDLER(result));
    }
    catch (e) {
        next(e);
    }
})

router.get("/:id", validateWebToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = res.locals.tokenId;
        const result = await restaurantsServices.findRes({ _id: new mongoose.Types.ObjectId((req.params.id).toString()) });
        console.log(result?.ownerId);
        console.log(result);
        if (result?.ownerId?.equals(new mongoose.Types.ObjectId((id).toString()))) {
            res.send(new RESPONSE_HANDLER(result));
        }
        else {
            throw { "message": "UnAuthorized User", "statusCode": 404 }
        }
    }
    catch (e) {
        next(e);
    }
})

// {
//   "official_name":"Mejwani",
//   "location":"Pune",
//   "menu":{
//     "Speciality":["Daal-Dokli","Rasmalai"],
//     "rotis":["Naan", "Kulcha", "Roti"]
//   },
//   "capacity":100
// }
export default router;