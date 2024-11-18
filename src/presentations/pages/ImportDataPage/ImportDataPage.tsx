import { Loading } from "@/presentations/shared/Loading";

import { useImportDataPage } from "./hooks/useImportDataPage";

export function ImportDataPage() {
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleImport();
      }}
    >
      <div className="flex">
        <div className="w-full rounded bg-white p-6 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">CSVから登録</h1>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="csvFile"
            >
              インポートCSVファイル
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="csvFile"
                className="hidden"
                accept=".csv"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="csvFile"
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                ファイル選択
              </label>
              <span className="ml-4 text-gray-600">
                {fileName || "CSVファイルを選択してください"}
              </span>
            </div>
          </div>

          <div className="flex">
            <button
              disabled={!enableImport || isLoading}
              type="submit"
              className="rounded bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 disabled:bg-gray-300"
            >
              インポート
            </button>
            <div className="ml-2">
              <Loading show={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
