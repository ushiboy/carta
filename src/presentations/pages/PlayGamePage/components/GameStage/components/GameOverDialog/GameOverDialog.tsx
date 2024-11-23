import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { ScoreInfo } from "@/domains/models/carta";

type Props = {
  open: boolean;
  scoreInfo: ScoreInfo;
  onRetry: () => void;
  onFinish: () => void;
};

export function GameOverDialog({ open, scoreInfo, onRetry, onFinish }: Props) {
  return (
    <Dialog
      data-testid="gameOverDialog"
      open={open}
      onClose={onFinish}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  ゲーム終了
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    正答数: {scoreInfo.corrected}
                  </p>
                  <p className="text-sm text-gray-500">
                    誤答数: {scoreInfo.incorrected}
                  </p>
                  <div
                    className="my-2 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow={scoreInfo.rate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full bg-blue-600 text-center text-xs text-white transition duration-500 dark:bg-blue-500"
                      style={{ width: `${scoreInfo.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                リトライ
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onFinish}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                終了する
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
