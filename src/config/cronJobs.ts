import cron from "node-cron";
import { AtendimentoService } from "../services/atendimentoService.js";

cron.schedule("*/1 * * * *", async () => {
  console.log("Verificando atendimentos inativos...");
  await AtendimentoService.encerrarAtendimentosInativos();
  console.log("Concluído verificação de atendimentos inativos");
});
