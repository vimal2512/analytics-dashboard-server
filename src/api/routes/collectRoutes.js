import express from "express";
import { collectEvent , collectBatchEvents} from "../controllers/collectController.js";

const router = express.Router();

router.post("/collect", collectEvent);

router.post("/collect-batch", collectBatchEvents)

export default router;