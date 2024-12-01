import {
  Base,
  Button,
  DropZone,
  FormControl,
  Input,
  PageHeading,
  Stack,
  Text,
} from "smarthr-ui";

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
  return (
    <Stack data-testid="importDataPage">
      <PageHeading>CSVインポート</PageHeading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onImport();
        }}
      >
        <Base padding={1}>
          <Stack gap={1.5}>
            {!fileName ? (
              <DropZone
                name="csvfile"
                data-testid="inputCsvFile"
                onSelectFiles={(_, files) => files && onFileChange(files[0])}
                accept=".csv"
              >
                <Text>
                  <span>ここにCSVファイルをドラッグアンドドロップ</span>
                  <span>または</span>
                </Text>
              </DropZone>
            ) : (
              <>
                <FormControl
                  title="タイトル"
                  statusLabelProps={{ type: "red", children: "必須" }}
                >
                  <Input
                    name="title"
                    data-testid="inputTitle"
                    type="text"
                    value={title}
                    className="h-11 w-72 md:w-96"
                    onChange={(e) => onTitleChange(e.target.value)}
                  />
                </FormControl>

                <div>
                  <Button
                    variant="primary"
                    data-testid="buttonImport"
                    disabled={!enableImport}
                    type="submit"
                    loading={isLoading}
                  >
                    インポート
                  </Button>
                </div>
              </>
            )}
          </Stack>
        </Base>
      </form>
    </Stack>
  );
}
