import { useId } from "react";

import { Loading } from "@/presentations/shared/Loading";

type Props = {
  title: string;
  fileName: string;
  enableImport: boolean;
  isLoading: boolean;
  onTitleChange: (v: string) => void;
  onFileChange: (file: File) => void;
  onImport: () => void;
};

export function ImportDataPage({
  title,
  fileName,
  enableImport,
  isLoading,
  onTitleChange,
  onFileChange,
  onImport,
}: Props) {
  const id = useId();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onImport();
      }}
    >
      <div className="flex">
        <div className="w-full rounded bg-white p-6 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">CSVから登録</h1>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor={`${id}-title`}
            >
              タイトル
            </label>
            <input
              type="text"
              id={`${id}-title`}
              data-testid="inputTitle"
              className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor={`${id}-file`}
            >
              インポートCSVファイル
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id={`${id}-file`}
                data-testid="inputCsvFile"
                className="hidden"
                accept=".csv"
                onChange={(e) =>
                  e.target.files && onFileChange(e.target.files[0])
                }
              />
              <label
                htmlFor={`${id}-file`}
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
              data-testid="buttonImport"
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
