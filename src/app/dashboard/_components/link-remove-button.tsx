'use client';

import { useCallback, useRef } from 'react';

import { Button } from '@/components';

type Props = {
  path: string;
  onRemove: () => any;
};

export const LinkRemoveButton: React.FC<Props> = ({ onRemove, path }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeDialog = useCallback(() => modalRef.current?.close(), []);

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          modalRef.current?.showModal();
        }}
        variant="sm"
        className="btn-primary"
      >
        Remove
      </Button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove link /{path}</h3>
          <p className="py-4">
            Do you really wish to remove this link? This action is not revertible!
          </p>

          <Button
            variant="sm"
            type="button"
            onClick={closeDialog}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Button>

          <div className="modal-action flex">
            <Button type="button" onClick={onRemove} variant="sm" className="btn-primary">
              Yes remove
            </Button>

            <Button type="button" onClick={closeDialog} variant="sm">
              No close
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};
