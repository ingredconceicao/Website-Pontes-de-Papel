import { Router } from "express";
import { aiRecommendBooks } from "../controllers/aiContorller";

const router = Router();

router.post("/recommend", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt é obrigatório" });
    }

    const books = await aiRecommendBooks(prompt);

    res.status(200).json(books);
  } catch (error) {
    console.error("Erro IA:", error);
    res.status(500).json({ error: "Falha ao gerar recomendações" });
  }
});

export default router;
