import { Router } from "express";
import { postFromNFC, postZPL, getZPLById, openZPLshorten , deleteURLid, getAllZPL} from "../controllers/zplController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenSchemaValidation.js";
import { ValidateZPL } from "../middlewares/zplSchemaValidation.js";

const router = Router();

router.post("/nfc", postFromNFC)
router.post("/zpl", tokenValidationMiddleware, ValidateZPL, postZPL);
router.get("/zpl", tokenValidationMiddleware, getAllZPL)
router.get("/zpl/:id", getZPLById);
router.get("/zpl/open/:shortUrl", openZPLshorten);
router.delete("/zpl/:id", tokenValidationMiddleware, deleteURLid);


export default router;