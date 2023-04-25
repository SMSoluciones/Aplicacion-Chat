import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello desde index Router");
});

export default router;
