type Props = {
  show: boolean;
};

export function Loading({ show }: Props) {
  if (!show) {
    return null;
  }
  return (
    <div
      data-testid="loading"
      className="flex justify-center"
      aria-label="読み込み中"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}
