import { ImportDataPage } from "./ImportDataPage";
import { useImportDataPage } from "./hooks";

export function ImportDataPageContainer() {
  const {
    title,
    fileName,
    enableImport,
    isLoading,
    setTitle,
    handleFileChange,
    handleImport,
  } = useImportDataPage();

  return (
    <ImportDataPage
      title={title}
      fileName={fileName}
      enableImport={enableImport}
      isLoading={isLoading}
      onTitleChange={setTitle}
      onFileChange={handleFileChange}
      onImport={handleImport}
    />
  );
}
