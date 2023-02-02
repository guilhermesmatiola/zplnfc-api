import { Router } from "express";
import { teste, postFromNFC, postZPL, getZPLById, openZPLshorten , deleteURLid, getAllZPL, getFromNFC} from "../controllers/zplController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenSchemaValidation.js";
import { ValidateZPL } from "../middlewares/zplSchemaValidation.js";

const router = Router();

router.get("/teste", getFromNFC)
router.get("/teste", teste)
router.post("/nfc", postFromNFC)
router.post("/zpl", tokenValidationMiddleware, ValidateZPL, postZPL);
router.get("/zpl", tokenValidationMiddleware, getAllZPL)
router.get("/zpl/:id", getZPLById);
router.get("/zpl/open/:shortUrl", openZPLshorten);
router.delete("/zpl/:id", tokenValidationMiddleware, deleteURLid);


export default router;