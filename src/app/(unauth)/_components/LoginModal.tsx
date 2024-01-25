'use client';

import '@/styles/tailwind.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginModal() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const router = useRouter();

  const onSubmit = () => {};
  const onClickClose = () => {
    router.back();
  };

  const onChangeId = () => {};

  const onChangePassword = () => {};

  return (
    <div className="modalBackground">
      <div className="max-w-4/5vw relative top-[5%] flex h-450 min-w-600 flex-col rounded-[1rem] bg-white">
        <div className="modalHeader">
          <button className="modalCloseButton" onClick={onClickClose} title="Close">
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form className="flex flex-1 flex-col" onSubmit={onSubmit}>
          <div className="modalBody">
            <div className="modalInputDiv">
              <label className="modalInputLabel" htmlFor="id">
                아이디
              </label>
              <input id="id" className="modalInput" value={id} onChange={onChangeId} type="text" placeholder="" />
            </div>
            <div className="modalInputDiv">
              <label className="modalInputLabel" htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className="modalInput"
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
          </div>
          <div className="flex justify-center font-bold text-primary">{message}</div>
          <div className="modalFooter">
            <button className="modalActionButton" disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
