import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { PairDraft } from "@/domains/models/carta";
import { parseCsvFile } from "@/lib/parseCsvFile";
import { useCreateGame } from "@/presentations/hooks/useCreateGame";

export function useImportDataPage() {
  const navigate = useNavigate();
  const { doCreate, isMutating } = useCreateGame();
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [pairDrafts, setPairDrafts] = useState<PairDraft[]>([]);

  const handleFileChange = useCallback(async (file?: File) => {
    if (file) {
      setFileName(file.name);
      const data = await parseCsvFile(file);
      setPairDrafts(
        data.map(([yomi, tori]) => ({
          yomi,
          tori,
        })),
      );
    }
  }, []);

  const enableImport = useMemo(
    () => title.length > 0 && pairDrafts.length > 0,
    [title, pairDrafts],
  );

  const handleImport = useCallback(async () => {
    if (enableImport) {
      await doCreate({
        title,
        pairDrafts,
      });
      alert(`${title}を登録しました。`);
      navigate("/");
    }
  }, [title, pairDrafts, enableImport, doCreate, navigate]);

  return {
    title,
    fileName,
    pairDrafts,
    enableImport,
    isLoading: isMutating,
    setTitle,
    setFileName,
    handleFileChange,
    handleImport,
  };
}
